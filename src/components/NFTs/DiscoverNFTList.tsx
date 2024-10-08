import { ChainId } from '@masknet/web3-shared-evm';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { ListInPage } from '@/components/ListInPage.js';
import { getSingleNFTFeedItemContent } from '@/components/NFTs/VirtualListHelper.js';
import { ScrollListKey, Source } from '@/constants/enum.js';
import { EMPTY_LIST } from '@/constants/index.js';
import { createIndicator, createPageable } from '@/helpers/pageable.js';
import { FireflySocialMediaProvider } from '@/providers/firefly/SocialMedia.js';
import type { NFTFeed } from '@/providers/types/NFTs.js';
import { useGlobalState } from '@/store/useGlobalStore.js';
import { useInvalidNFTStore } from '@/store/useInvalidNFTStore.js';

export function DiscoverNFTList() {
    const currentSource = useGlobalState.use.currentSource();

    const nftQueryResult = useSuspenseInfiniteQuery({
        queryKey: ['nfts', 'discover', currentSource],
        networkMode: 'always',
        async queryFn({ pageParam }) {
            if (currentSource !== Source.NFTs) return createPageable<NFTFeed>(EMPTY_LIST, createIndicator());
            return await FireflySocialMediaProvider.discoverNFTs({
                indicator: createIndicator(undefined, pageParam),
            });
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextIndicator?.id,
        select: (data) => data.pages.flatMap((p) => p.data),
    });

    const invalidNFTCount = useInvalidNFTStore((state) => state.size);
    const filteredData = useMemo(() => {
        const invalidNFTStore = useInvalidNFTStore.getState();
        return nftQueryResult.data.filter((feed) => {
            const tokenId = feed.trans.token_list?.[0]?.id ?? '';
            return !invalidNFTStore.has(ChainId.Mainnet, feed.trans.token_address, tokenId);
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nftQueryResult.data, invalidNFTCount]);

    return (
        <ListInPage
            key={currentSource}
            queryResult={{ ...nftQueryResult, data: filteredData }}
            VirtualListProps={{
                listKey: `${ScrollListKey.Discover}:${Source.NFTs}`,
                computeItemKey: (index, nftFeed) => `${nftFeed.id}-${index}`,
                itemContent: (index, nftFeed) =>
                    getSingleNFTFeedItemContent(index, nftFeed, {
                        listKey: `${ScrollListKey.Discover}:${Source.NFTs}`,
                    }),
                overscan: 2000,
            }}
            NoResultsFallbackProps={{
                className: 'md:pt-[228px] max-md:py-20',
            }}
        />
    );
}
