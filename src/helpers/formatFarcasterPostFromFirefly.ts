import { compact, first, last } from 'lodash-es';

import { Source } from '@/constants/enum.js';
import { createDummyProfile } from '@/helpers/createDummyProfile.js';
import { formatChannelFromFirefly } from '@/helpers/formatFarcasterChannelFromFirefly.js';
import { formatFarcasterProfileFromFirefly } from '@/helpers/formatFarcasterProfileFromFirefly.js';
import { getEmbedUrls } from '@/helpers/getEmbedUrls.js';
import { getResourceType } from '@/helpers/getResourceType.js';
import type { Cast } from '@/providers/types/Firefly.js';
import {
    type Attachment,
    type Post,
    type PostType,
    type Profile,
    ProfileStatus,
} from '@/providers/types/SocialMedia.js';

function formatContent(cast: Cast): Post['metadata']['content'] {
    const oembedUrls = getEmbedUrls(cast.text, compact(cast.embeds.map((x) => x.url)));
    const defaultContent = { content: cast.text, oembedUrl: last(oembedUrls), oembedUrls };

    if (cast.embeds.length) {
        const firstAsset = first(cast.embeds);
        if (!firstAsset?.url) return defaultContent;

        const assetType = getResourceType(firstAsset.url);
        if (!assetType) return defaultContent;

        return {
            content: cast.text,
            oembedUrl: last(oembedUrls),
            oembedUrls,
            asset: {
                type: assetType,
                uri: firstAsset.url,
            } satisfies Attachment,
            attachments: compact<Attachment>(
                cast.embeds.map((x) => {
                    if (!x.url) return;

                    const type = getResourceType(x.url);
                    if (!type) return;

                    return {
                        type: assetType,
                        uri: x.url,
                    };
                }),
            ),
        };
    }
    return defaultContent;
}

/**
 * Return null if cast is detected
 */
export function formatFarcasterPostFromFirefly(cast: Cast, type?: PostType): Post | null {
    const postType = cast.quotedCast ? 'Quote' : type ?? cast.parentCast ? 'Comment' : 'Post';
    if (cast.deleted_at) return null;
    return {
        publicationId: cast.hash,
        type: postType,
        postId: cast.hash,
        parentPostId: cast.parent_hash,
        parentAuthor: cast.parentCast?.author ? formatFarcasterProfileFromFirefly(cast.parentCast?.author) : undefined,
        timestamp: cast.timestamp ? new Date(cast.timestamp).getTime() : undefined,
        author: cast.author ? formatFarcasterProfileFromFirefly(cast.author) : createDummyProfile(Source.Farcaster),
        metadata: {
            locale: '',
            content: formatContent(cast),
        },
        stats: {
            comments: Number(cast.replyCount),
            mirrors: cast.recastCount,
            quotes: cast.recastCount,
            reactions: cast.likeCount,
        },
        mentions: cast.mentions_user.map<Profile>((x) => {
            return {
                profileId: x.fid,
                displayName: x.handle,
                handle: x.handle,
                fullHandle: x.handle,
                pfp: '',
                source: Source.Farcaster,
                followerCount: 0,
                followingCount: 0,
                status: ProfileStatus.Active,
                verified: true,
            };
        }),
        mirrors: cast.recastedBy ? [formatFarcasterProfileFromFirefly(cast.recastedBy)] : undefined,
        hasLiked: cast.liked,
        hasMirrored: cast.recasted,
        hasBookmarked: cast.bookmarked,
        source: Source.Farcaster,
        canComment: true,
        commentOn: cast.parentCast ? formatFarcasterPostFromFirefly(cast.parentCast) : undefined,
        root: cast.rootParentCast ? formatFarcasterPostFromFirefly(cast.rootParentCast) : undefined,
        threads: compact(cast.threads?.map((x) => formatFarcasterPostFromFirefly(x, 'Comment'))),
        channel: cast.channel ? formatChannelFromFirefly(cast.channel) : undefined,
        quoteOn: cast.quotedCast ? formatFarcasterPostFromFirefly(cast.quotedCast) : undefined,
        __original__: cast,
    };
}
