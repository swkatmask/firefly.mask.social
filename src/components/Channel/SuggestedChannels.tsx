'use client';

import { Trans } from '@lingui/macro';
import { EMPTY_LIST } from '@masknet/shared-base';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import { AsideTitle } from '@/components/AsideTitle.js';
import { ChannelInList } from '@/components/ChannelInList.js';
import { PageRoute, type SocialSource } from '@/constants/enum.js';
import { Link } from '@/esm/Link.js';
import { resolveSocialMediaProvider } from '@/helpers/resolveSocialMediaProvider.js';

const SHOW_LENGTH = 3;

export interface SuggestedChannelsProps {
    source: SocialSource;
}
export function SuggestedChannels({ source }: SuggestedChannelsProps) {
    const { data, isLoading, isError } = useQuery({
        queryKey: ['suggest-channels', source],
        queryFn: async () => {
            return resolveSocialMediaProvider(source).discoverChannels();
        },
    });

    if (isError || isLoading) return null;

    const channels = data?.data ?? EMPTY_LIST;
    const showMore = channels.length > SHOW_LENGTH;
    const suggestedChannels = channels.slice(0, SHOW_LENGTH);

    if (!suggestedChannels.length) return null;

    return (
        <div className="rounded-lg border border-line dark:border-0 dark:bg-lightBg">
            <AsideTitle>
                <Trans>Suggested Channels</Trans>
            </AsideTitle>
            <div className="flex flex-col">
                {suggestedChannels.map((channel) => (
                    <ChannelInList key={channel.id} channel={channel} noFollowButton dense />
                ))}
            </div>
            {showMore ? (
                <Link
                    href={PageRoute.ChannelTrending}
                    className="flex px-4 py-2 text-[15px] font-bold leading-[24px] text-[#9250FF]"
                >
                    <Trans>Show More</Trans>
                </Link>
            ) : null}
        </div>
    );
}
