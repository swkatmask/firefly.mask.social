import { t } from '@lingui/macro';
import { delay } from '@masknet/kit';
import dayjs from 'dayjs';
import { compact, first } from 'lodash-es';

import type { SocialSourceInURL } from '@/constants/enum.js';
import { readChars } from '@/helpers/chars.js';
import { enqueueErrorMessage, enqueueSuccessMessage } from '@/helpers/enqueueMessage.js';
import { getProfileSessionsAll } from '@/helpers/getProfileState.js';
import { getSnackbarMessageFromError } from '@/helpers/getSnackbarMessageFromError.js';
import type { SchedulePayload } from '@/helpers/resolveCreateSchedulePostPayload.js';
import { fireflySessionHolder } from '@/providers/firefly/SessionHolder.js';
import { FireflySocialMediaProvider } from '@/providers/firefly/SocialMedia.js';
import { CreateScheduleError, createSchedulePostsPayload } from '@/services/crossSchedulePost.js';
import { uploadSessions } from '@/services/metrics.js';
import { useComposeStateStore } from '@/store/useComposeStore.js';

export async function crossPostScheduleThread(scheduleTime: Date) {
    try {
        const { posts, type } = useComposeStateStore.getState();
        if (posts.length === 1) throw new Error(t`A thread must have at least two posts.`);

        if (dayjs().add(7, 'day').isBefore(scheduleTime)) {
            throw new CreateScheduleError(t`Up to 7 days can be set as the scheduled time.`);
        } else if (dayjs().isAfter(scheduleTime, 'minute')) {
            throw new CreateScheduleError(`The scheduled time has passed.`);
        }

        const results = new Map<
            SocialSourceInURL,
            { platform: SocialSourceInURL; platformUserId: string; payload: SchedulePayload[] }
        >();

        for (const [index, post] of posts.entries()) {
            const payload = await createSchedulePostsPayload(index === 0 ? 'compose' : 'reply', post, true);
            payload.forEach((x) => {
                const origin = results.get(x.platform);
                results.set(x.platform, {
                    ...x,
                    payload: origin ? [...origin.payload, x.payload] : [x.payload],
                });
            });
            await delay(1000);
        }

        const postsPayload = [...results.values()];

        const post = first(posts);
        const assets = compact([
            post?.images.length ? t`[Photo]` : undefined,
            post?.video ? t`[Video]` : undefined,
            post?.poll ? t`[Poll]` : undefined,
        ]).join('');

        const chars = post ? readChars(post.chars, 'visible') : '';
        const content = `${chars}${chars.length > 0 ? '\n' : ''}${assets}`;

        await uploadSessions(fireflySessionHolder.sessionRequired, getProfileSessionsAll());

        const result = await FireflySocialMediaProvider.schedulePost(
            scheduleTime,
            postsPayload.map((x) => ({
                ...x,
                payload: JSON.stringify(x.payload),
            })),
            {
                content,
                type,
            },
        );

        if (!result) return;
        enqueueSuccessMessage(t`Your schedule thread has created successfully.`);
    } catch (error) {
        if (error instanceof CreateScheduleError) {
            enqueueErrorMessage(error.message);
        } else {
            enqueueErrorMessage(getSnackbarMessageFromError(error, t`Failed to create schedule thread posts.`), {
                error,
            });
        }
        throw error;
    }
}
