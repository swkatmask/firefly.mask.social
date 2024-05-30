import { createLookupTableResolver } from '@masknet/shared-base';
import { getUnixTime } from 'date-fns';
import { v4 as uuid } from 'uuid';

import { type SocialSource, Source } from '@/constants/enum.js';
import { SORTED_SOCIAL_SOURCES } from '@/constants/index.js';
import { getCurrentProfileAll } from '@/helpers/getCurrentProfileAll.js';
import { fireflySessionHolder } from '@/providers/firefly/SessionHolder.js';
import type { ReportCrossPostResponse } from '@/providers/types/Firefly.js';
import type { CompositePost } from '@/store/useComposeStore.js';

interface Report {
    // client uuid for distinguishing logs
    relation_id: string;
    // in seconds
    post_time: number;
    post_id: string;
    // profile id in such platforms as Lens, Farcaster, etc.
    platform_id: string;
    ua_type: 'web' | 'ios' | 'android' | 'schedule:web' | 'schedule:ios' | 'schedule:android';
    // platform name
    platform: string;
}

const resolvePlatform = createLookupTableResolver<SocialSource, string>(
    {
        [Source.Farcaster]: 'farcaster',
        [Source.Lens]: 'lens',
        [Source.Twitter]: 'twitter',
    },
    (x) => {
        throw new Error(`Unknown platform ${x}`);
    },
);

export async function reportCrossedPost(post: CompositePost) {
    // a post shared across multiple platforms will have the same relation ID
    const relationId = uuid();
    const currentProfileAll = getCurrentProfileAll();

    const reports = SORTED_SOCIAL_SOURCES.map<Report | null>((x) => {
        const postId = post.postId[x];
        if (!postId) return null;

        const profileId = currentProfileAll[x]?.profileId;
        if (!profileId) return null;

        return {
            ua_type: 'web',
            relation_id: relationId,
            // TODO: post time of the original post
            post_time: getUnixTime(Date.now()),
            post_id: postId,
            // TODO: profile id of the author
            platform_id: profileId,
            platform: resolvePlatform(x),
        };
    });

    const allSettled = await Promise.allSettled(
        reports.map((x) => {
            if (!x) return Promise.resolve(null);
            // cspell: disable-next-line
            return fireflySessionHolder.fetch<ReportCrossPostResponse>('/v1/logpush', {
                method: 'POST',
                body: JSON.stringify(x),
            });
        }),
    );

    allSettled.forEach((x, i) => {
        const source = SORTED_SOCIAL_SOURCES[i];

        if (x.status === 'rejected') {
            console.error(`[report]: occurs error when report ${source} post: ${post.postId[source]}`, x.reason);
        } else if (x.value?.code !== 0) {
            console.error(`[report]: occurs error when report ${source} post: ${post.postId[source]}`, x.value?.error);
        }
    });
}
