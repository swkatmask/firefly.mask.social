'use client';

import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getFollowInList } from '@/components/FollowInList.js';
import { ListInPage } from '@/components/ListInPage.js';
import { ScrollListKey, type SocialSourceInURL } from '@/constants/enum.js';
import { EMPTY_LIST } from '@/constants/index.js';
import { createIndicator, type Pageable, type PageIndicator } from '@/helpers/pageable.js';
import { resolveSocialMediaProvider } from '@/helpers/resolveSocialMediaProvider.js';
import { resolveSocialSource } from '@/helpers/resolveSource.js';
import type { Profile } from '@/providers/types/SocialMedia.js';

export function FollowersList({ profileId, source }: { profileId: string; source: SocialSourceInURL }) {
    const socialSource = resolveSocialSource(source);
    const queryResult = useSuspenseInfiniteQuery({
        queryKey: ['profiles', socialSource, 'followers', profileId],
        queryFn({ pageParam }) {
            const provider = resolveSocialMediaProvider(socialSource);
            return provider.getFollowers(profileId, createIndicator(undefined, pageParam));
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => (lastPage as Pageable<Profile, PageIndicator>)?.nextIndicator?.id,
        select: (data) => data.pages.flatMap((page) => page?.data ?? EMPTY_LIST),
    });

    return (
        <ListInPage
            key={source}
            queryResult={queryResult}
            VirtualListProps={{
                key: `${ScrollListKey.Followers}:${source}:${profileId}`,
                computeItemKey: (index, item: Profile) => `${item.profileId}-${index}`,
                itemContent: (index, item: Profile) => getFollowInList(index, item),
            }}
            NoResultsFallbackProps={{
                className: 'md:pt-[228px] max-md:py-20',
            }}
        />
    );
}
