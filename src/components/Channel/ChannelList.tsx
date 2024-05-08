import { createIndicator, EMPTY_LIST } from '@masknet/shared-base';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { ChannelInList } from '@/components/ChannelInList.js';
import { ListInPage } from '@/components/ListInPage.js';
import { ScrollListKey, type SocialSource } from '@/constants/enum.js';
import { resolveSocialMediaProvider } from '@/helpers/resolveSocialMediaProvider.js';
import type { Channel } from '@/providers/types/SocialMedia.js';

const getChannelItemContent = (index: number, channel: Channel) => {
    return <ChannelInList key={channel.id} channel={channel} />;
};

interface ChannelListProps {
    source: SocialSource;
}

export function ChannelList({ source }: ChannelListProps) {
    const queryResult = useSuspenseInfiniteQuery({
        queryKey: ['channels', source, 'channels-of'],

        queryFn: async ({ pageParam }) => {
            const provider = resolveSocialMediaProvider(source);
            return provider.discoverChannels(createIndicator(undefined, pageParam));
        },
        initialPageParam: '',
        getNextPageParam: (lastPage) => lastPage.nextIndicator?.id,
        select: (data) => {
            return data.pages.flatMap((x) => x.data) || EMPTY_LIST;
        },
    });

    return (
        <ListInPage
            key={source}
            queryResult={queryResult}
            VirtualListProps={{
                listKey: `${ScrollListKey.Channel}`,
                computeItemKey: (index, channel) => `${channel.id}-${index}`,
                itemContent: getChannelItemContent,
            }}
            NoResultsFallbackProps={{
                className: 'mt-20',
            }}
        />
    );
}
