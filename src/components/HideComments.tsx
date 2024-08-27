'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import React, { type PropsWithChildren, useState } from 'react';

import { ListInPage } from '@/components/ListInPage.js';
import { ShowMoreComments } from '@/components/ShowMoreComments.js';
import { getPostItemContent } from '@/components/VirtualList/getPostItemContent.js';
import { ScrollListKey, type SocialSource } from '@/constants/enum.js';
import { resolveSocialMediaProvider } from '@/helpers/resolveSocialMediaProvider.js';

interface ShowMoreCommentsProps {
    postId: string;
    fallback?: PropsWithChildren['children'];
    className?: string;
    excludePostIds?: string[];
    source: SocialSource;
}

export function HideComments(props: ShowMoreCommentsProps) {
    const { postId, fallback = null, className, excludePostIds = [], source } = props;
    const queryResult = useInfiniteQuery({
        queryKey: ['hidden-comments', source, postId],
        async queryFn() {
            const provider = resolveSocialMediaProvider(source);

            return await provider.getHiddenComments(postId);
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextIndicator?.id,
        select(data) {
            return data.pages.flatMap((x) => x.data).filter((x) => !excludePostIds.includes(x.postId));
        },
    });

    const { isLoading, data } = queryResult;

    const [isOpen, setIsOpen] = useState(false);

    if (isLoading) return null;
    if (!data || data.length <= 0) return fallback;

    return (
        <>
            <ShowMoreComments
                avatarUrls={data.map((post) => post.author.pfp)}
                isOpen={isOpen}
                onClick={() => setIsOpen((o) => !o)}
                className={className}
            />
            {isOpen ? (
                <ListInPage
                    queryResult={queryResult}
                    VirtualListProps={{
                        listKey: `${ScrollListKey.Comment}:${postId}`,
                        computeItemKey: (index, post) => `${post.postId}-${index}`,
                        itemContent: (index, post) =>
                            getPostItemContent(index, post, `${ScrollListKey.Comment}:${postId}`, { isComment: true }),
                    }}
                />
            ) : null}
        </>
    );
}
