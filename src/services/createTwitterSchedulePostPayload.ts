import { compact } from '@apollo/client/utilities';

import { Source } from '@/constants/enum.js';
import { readChars } from '@/helpers/chars.js';
import { downloadMediaObjects } from '@/helpers/downloadMediaObjects.js';
import { createTwitterMediaObject } from '@/helpers/resolveMediaObjectUrl.js';
import { resolveTwitterReplyRestriction } from '@/helpers/resolveTwitterReplyRestriction.js';
import { TwitterPollProvider } from '@/providers/twitter/Poll.js';
import { uploadToTwitter } from '@/services/uploadToTwitter.js';
import { type CompositePost } from '@/store/useComposeStore.js';
import { type ComposeType } from '@/types/compose.js';

export interface TwitterSchedulePostPayload {
    quote_tweet_id?: string;
    in_reply_to_tweet_id?: string;
    text: string;
    media_ids: string[];
    reply_settings: '' | 'following' | 'mentionedUsers';
    poll?: {
        options: Array<{ label: string }>;
        duration_minutes: number;
    };
}

export async function createTwitterSchedulePostPayload(
    type: ComposeType,
    compositePost: CompositePost,
    isThread = false,
): Promise<TwitterSchedulePostPayload> {
    const { chars, images, parentPost, restriction, poll } = compositePost;

    const twitterParentPost = parentPost.Twitter;

    const confirmedMedias = await downloadMediaObjects(images);
    const imageResults = (await uploadToTwitter(confirmedMedias.map((x) => x.file))).map((x, index) =>
        createTwitterMediaObject(x, confirmedMedias[index]),
    );

    const pollResult = poll ? await TwitterPollProvider.createPoll(poll) : undefined;

    return {
        quote_tweet_id: twitterParentPost && type === 'quote' ? twitterParentPost.postId : undefined,
        in_reply_to_tweet_id: !isThread
            ? twitterParentPost && type === 'reply'
                ? twitterParentPost.postId
                : undefined
            : '$$in_reply_to_tweet_id$$',
        text: readChars(chars, 'both', Source.Twitter),
        media_ids: compact(imageResults?.map((x) => x.id)),
        reply_settings: resolveTwitterReplyRestriction(restriction),
        poll: pollResult
            ? {
                  options: pollResult.options.map((option) => ({ label: option.label })),
                  duration_minutes: pollResult.durationSeconds,
              }
            : undefined,
    };
}
