import { t } from '@lingui/macro';
import { delay } from '@masknet/kit';
import dayjs from 'dayjs';

import type { SocialSourceInURL } from '@/constants/enum.js';
import { enqueueErrorMessage, enqueueSuccessMessage } from '@/helpers/enqueueMessage.js';
import { getSnackbarMessageFromError } from '@/helpers/getSnackbarMessageFromError.js';
import type { SchedulePayload } from '@/helpers/resolveCreateSchedulePostPayload.js';
import { FireflySocialMediaProvider } from '@/providers/firefly/SocialMedia.js';
import { createSchedulePostsPayload } from '@/services/crossSchedulePost.js';
import { useComposeStateStore } from '@/store/useComposeStore.js';

export async function crossPostScheduleThread(scheduleTime: Date) {
    try {
        const { posts, type } = useComposeStateStore.getState();
        if (posts.length === 1) throw new Error(t`A thread must have at least two posts.`);

        if (dayjs().add(7, 'day').isBefore(scheduleTime)) {
            throw new Error(t`Up to 7 days can be set as the scheduled time. Please reset it.`);
        } else if (dayjs().isAfter(scheduleTime, 'minute')) {
            throw new Error(t`The scheduled time has passed. Please reset it.`);
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

        const result = await FireflySocialMediaProvider.schedulePost(
            scheduleTime,
            postsPayload.map((x) => ({
                ...x,
                payload: JSON.stringify(x.payload),
            })),
            {
                posts,
                type,
            },
        );

        if (!result) return;
        enqueueSuccessMessage(t`Your schedule thread has created successfully.`);
    } catch (error) {
        enqueueErrorMessage(getSnackbarMessageFromError(error, t`Failed to create schedule thread posts.`), {
            error,
        });
        throw error;
    }
}
