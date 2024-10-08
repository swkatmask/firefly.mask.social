'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { ListInPage } from '@/components/ListInPage.js';
import { getSingleFollowingNFTItemContent } from '@/components/NFTs/VirtualListHelper.js';
import { ScrollListKey, Source } from '@/constants/enum.js';
import { EMPTY_LIST, SORTED_SOCIAL_SOURCES } from '@/constants/index.js';
import { createIndicator, createPageable } from '@/helpers/pageable.js';
import { useCurrentProfileAll } from '@/hooks/useCurrentProfile.js';
import { FireflySocialMediaProvider } from '@/providers/firefly/SocialMedia.js';
import type { FollowingNFT } from '@/providers/types/NFTs.js';
import { useGlobalState } from '@/store/useGlobalStore.js';

export function FollowingNFTList({ walletAddress }: { walletAddress?: string }) {
    const currentSource = walletAddress ? Source.NFTs : useGlobalState.use.currentSource();
    const currentProfileAll = useCurrentProfileAll();
    const profileKey = SORTED_SOCIAL_SOURCES.map((x) => currentProfileAll[x]?.profileId);

    const queryKey = walletAddress
        ? ['nfts-of', walletAddress, profileKey]
        : ['nfts', 'following', currentSource, profileKey];
    const nftQueryResult = useSuspenseInfiniteQuery({
        queryKey,
        networkMode: 'always',
        async queryFn({ pageParam }) {
            if (currentSource !== Source.NFTs) return createPageable<FollowingNFT>(EMPTY_LIST, createIndicator());
            return FireflySocialMediaProvider.getFollowingNFTs({
                indicator: createIndicator(undefined, pageParam),
                walletAddresses: walletAddress ? [walletAddress] : undefined,
            });
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextIndicator?.id,
        select: (data) => data.pages.flatMap((p) => p.data),
    });

    return (
        <ListInPage
            key={currentSource}
            queryResult={nftQueryResult}
            VirtualListProps={{
                listKey: `${ScrollListKey.Following}:${Source.NFTs}`,
                computeItemKey: (index, nft) => `${nft.hash}-${index}`,
                itemContent: (index, nft) =>
                    getSingleFollowingNFTItemContent(index, nft, {
                        listKey: `${ScrollListKey.Following}:${Source.NFTs}`,
                    }),
            }}
            NoResultsFallbackProps={{
                className: 'md:pt-[228px] max-md:py-20',
            }}
        />
    );
}
