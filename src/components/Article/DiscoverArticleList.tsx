'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';
import { memo } from 'react';

import { ListInPage } from '@/components/ListInPage.js';
import { getArticleItemContent } from '@/components/VirtualList/getArticleItemContent.js';
import { ScrollListKey, Source } from '@/constants/enum.js';
import { EMPTY_LIST } from '@/constants/index.js';
import { createIndicator, createPageable } from '@/helpers/pageable.js';
import { FireflyArticleProvider } from '@/providers/firefly/Article.js';
import type { Article } from '@/providers/types/Article.js';
import { useGlobalState } from '@/store/useGlobalStore.js';

export const DiscoverArticleList = memo(function DiscoverArticleList() {
    const currentSource = useGlobalState.use.currentSource();

    const articleQueryResult = useSuspenseInfiniteQuery({
        queryKey: ['articles', 'discover', currentSource],
        networkMode: 'always',
        queryFn: async ({ pageParam }) => {
            if (currentSource !== Source.Article) return createPageable<Article>(EMPTY_LIST, createIndicator());
            return FireflyArticleProvider.discoverArticles(createIndicator(undefined, pageParam));
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextIndicator?.id,
        select: (data) => data.pages.flatMap((x) => x.data),
    });

    return (
        <ListInPage
            key={currentSource}
            queryResult={articleQueryResult}
            VirtualListProps={{
                listKey: `${ScrollListKey.Discover}:${Source.Article}`,
                computeItemKey: (index, article) => `${article.id}-${index}`,
                itemContent: (index, article) =>
                    getArticleItemContent(index, article, `${ScrollListKey.Discover}:${Source.Article}`),
            }}
            NoResultsFallbackProps={{
                className: 'md:pt-[228px] max-md:py-20',
            }}
        />
    );
});
