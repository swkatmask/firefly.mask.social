import { delay, safeUnreachable } from '@masknet/kit';
import urlcat from 'urlcat';

import { FileMimeType, UploadMediaStatus } from '@/constants/enum.js';
import { TimeoutError, UnreachableError } from '@/constants/error.js';
import { MAX_SIZE_PER_CHUNK } from '@/constants/index.js';
import { twitterSessionHolder } from '@/providers/twitter/SessionHolder.js';
import type { GetUploadStatusResponse, UploadMediaResponse } from '@/types/twitter.js';

function getMediaCategoryByMime(type: FileMimeType, target: 'tweet' | 'dm') {
    switch (type) {
        case FileMimeType.MP4:
        case FileMimeType.MOV:
            return target === 'tweet' ? 'TweetVideo' : 'DmVideo';
        case FileMimeType.GIF:
            return target === 'tweet' ? 'TweetGif' : 'DmGif';
        case FileMimeType.JPEG:
        case FileMimeType.PNG:
        case FileMimeType.WEBP:
            return target === 'tweet' ? 'TweetImage' : 'DmImage';
        case FileMimeType.BMP:
        case FileMimeType.GPP:
        case FileMimeType.MPEG:
        case FileMimeType.MS_VIDEO:
        case FileMimeType.OGG:
        case FileMimeType.WEBM:
        case FileMimeType.GPP2:
            return;
        default:
            safeUnreachable(type);
            return;
    }
}

async function waitForUpload(media_id: string, retry = 30) {
    const { data } = await twitterSessionHolder.fetch<{ data: GetUploadStatusResponse }>(
        urlcat('/api/twitter/uploadMedia/chunk', { media_id }),
    );

    switch (data.processing_info?.state) {
        case UploadMediaStatus.Failed:
            throw new Error(data.processing_info.error?.message || 'Failed to upload on X');
        case UploadMediaStatus.Success:
            return data;
        case UploadMediaStatus.Pending:
        case UploadMediaStatus.Uploading:
            if (retry <= 0) {
                throw new TimeoutError('Timeout waiting for upload');
            }
            await delay(1000);
            return waitForUpload(media_id, retry - 1);
        default:
            throw new UnreachableError('UploadMediaStatus', data.processing_info?.state);
    }
}

export async function uploadToTwitterWithChunks(file: File, chunkSize = MAX_SIZE_PER_CHUNK) {
    const chunks = [];
    const fileSize = file.size;
    for (let i = 0; i < fileSize; i += chunkSize) {
        chunks.push(file.slice(i, Math.min(i + chunkSize, fileSize)));
    }

    // Init upload
    const mediaInfo = await twitterSessionHolder.fetch<{ data: UploadMediaResponse }>(
        urlcat('/api/twitter/uploadMedia/chunk/init', {
            total_bytes: fileSize,
            media_type: file.type,
            media_category: getMediaCategoryByMime(file.type as FileMimeType, 'tweet'),
        }),
        { method: 'POST' },
    );

    // upload chunks
    await Promise.all(
        chunks.map(async (chunk, index) => {
            const formData = new FormData();
            formData.append('media', chunk);

            return twitterSessionHolder.fetch(
                urlcat('/api/twitter/uploadMedia/chunk/append', {
                    media_id: mediaInfo.data.media_id,
                    segment_index: index,
                }),
                {
                    method: 'POST',
                    body: formData,
                },
            );
        }),
    );

    // Finish upload
    const { data } = await twitterSessionHolder.fetch<{ data: GetUploadStatusResponse }>(
        urlcat('/api/twitter/uploadMedia/chunk', {
            media_id: mediaInfo.data.media_id,
        }),
        { method: 'POST' },
    );

    // small size media will be success immediately, no need to wait
    if (data?.processing_info?.state === UploadMediaStatus.Success) {
        return mediaInfo;
    }

    // Confirm upload
    await waitForUpload(mediaInfo.data.media_id);

    return mediaInfo;
}
