import { type Draft, produce } from 'immer';

import { queryClient } from '@/configs/queryClient.js';
import { Source } from '@/constants/enum.js';
import { isSameAddress } from '@/helpers/isSameAddress.js';
import { resolveSourceFromUrl } from '@/helpers/resolveSource.js';
import type { FireflySocialMedia } from '@/providers/firefly/SocialMedia.js';
import type { Article } from '@/providers/types/Article.js';
import type { FollowingNFT, NFTFeed } from '@/providers/types/NFTs.js';
import type { ClassType } from '@/types/index.js';

function toggleBlock(address: string, status: boolean) {
    type PagesData = { pages: Array<{ data: Article[] }> };
    interface NFTPagesData {
        pages: Array<{ data: FollowingNFT[] | NFTFeed[] }>;
    }
    const patcher = (old: Draft<PagesData> | undefined) => {
        if (!old) return old;
        return produce(old, (draft) => {
            for (const page of draft.pages) {
                if (!page) continue;
                for (const article of page.data) {
                    if (!isSameAddress(article.author.id, address)) continue;
                    article.author.isMuted = status;
                }
            }
        });
    };
    queryClient.setQueriesData<{ pages: Array<{ data: Article[] }> }>({ queryKey: ['articles'] }, patcher);
    queryClient.setQueriesData<PagesData>({ queryKey: ['posts', Source.Article, 'bookmark'] }, patcher);
    queryClient.setQueriesData<Article>({ queryKey: ['article-detail'] }, (old) => {
        if (!old) return;
        return produce(old, (draft) => {
            if (!isSameAddress(draft.author.id, address)) return;
            draft.author.isMuted = status;
        });
    });
    // Muted status in wallet profile
    queryClient.setQueryData(['address-is-muted', address.toLowerCase()], status);

    const nftsPatcher = (old: Draft<NFTPagesData> | undefined) => {
        if (!old) return old;
        return produce(old, (draft) => {
            for (const page of draft.pages) {
                if (!page.data.length) continue;
                page.data = page.data.filter((nft) => {
                    if ('network' in nft) {
                        return !isSameAddress(nft.owner, address);
                    } else {
                        return !isSameAddress(nft.address, address);
                    }
                }) as FollowingNFT[] | NFTFeed[];
            }
        });
    };

    queryClient.setQueriesData<NFTPagesData>({ queryKey: ['nfts', 'following', Source.NFTs] }, nftsPatcher);
    queryClient.setQueriesData<NFTPagesData>({ queryKey: ['nfts', 'discover', Source.NFTs] }, nftsPatcher);
}

const METHODS_BE_OVERRIDDEN = ['blockWallet', 'unblockWallet'] as const;
const METHODS_BE_OVERRIDDEN_MUTE_ALL = ['muteProfileAll'] as const;

type Provider = FireflySocialMedia;
export function SetQueryDataForBlockWallet() {
    return function decorator<T extends ClassType<Provider>>(target: T): T {
        function overrideMethod<K extends (typeof METHODS_BE_OVERRIDDEN)[number]>(key: K) {
            const method = target.prototype[key] as Provider[K];

            Object.defineProperty(target.prototype, key, {
                value: async (address: string) => {
                    const m = method as (address: string) => ReturnType<Provider[K]>;
                    const status = key === 'blockWallet';
                    try {
                        toggleBlock(address, status);
                        return await m.call(target.prototype, address);
                    } catch (error) {
                        // rolling back
                        toggleBlock(address, !status);
                        throw error;
                    }
                },
            });
        }

        METHODS_BE_OVERRIDDEN.forEach(overrideMethod);

        return target;
    };
}

export function SetQueryDataForMuteAllWallets() {
    return function decorator<T extends ClassType<Provider>>(target: T): T {
        function overrideMethod<K extends (typeof METHODS_BE_OVERRIDDEN_MUTE_ALL)[number]>(key: K) {
            const method = target.prototype[key] as Provider[K];

            Object.defineProperty(target.prototype, key, {
                value: async (source: Source, identity: string) => {
                    const m = method as (source: Source, identity: string) => ReturnType<Provider[K]>;
                    const relationships = await m.call(target.prototype, source, identity);
                    [...relationships, { snsId: identity, snsPlatform: source }].forEach(({ snsId, snsPlatform }) => {
                        const source = resolveSourceFromUrl(snsPlatform);
                        queryClient.setQueryData(['profile', 'mute-all', source, snsId], true);

                        if (source === Source.Wallet) {
                            toggleBlock(snsId, true);
                        }
                    });

                    return relationships;
                },
            });
        }

        METHODS_BE_OVERRIDDEN_MUTE_ALL.forEach(overrideMethod);
        return target;
    };
}
