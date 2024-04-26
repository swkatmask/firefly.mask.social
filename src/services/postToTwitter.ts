import { t } from '@lingui/macro';

import { SocialPlatform } from '@/constants/enum.js';
import { readChars } from '@/helpers/chars.js';
import { createDummyProfile } from '@/helpers/createDummyProfile.js';
import { resolveSourceName } from '@/helpers/resolveSourceName.js';
import { TwitterSocialMediaProvider } from '@/providers/twitter/SocialMedia.js';
import { type Post, type PostType } from '@/providers/types/SocialMedia.js';
import { createPostTo } from '@/services/createPostTo.js';
import { uploadToTwitter } from '@/services/uploadToTwitter.js';
import { type CompositePost } from '@/store/useComposeStore.js';
import { useTwitterStateStore } from '@/store/useProfileStore.js';
import type { ComposeType } from '@/types/compose.js';
import type { MediaObject } from '@/types/index.js';

export async function postToTwitter(type: ComposeType, compositePost: CompositePost) {
    const { chars, images, postId, parentPost, restriction } = compositePost;

    const twitterPostId = postId.Twitter;
    const twitterParentPost = parentPost.Twitter;
    const sourceName = resolveSourceName(SocialPlatform.Twitter);

    // already posted to x
    if (twitterPostId) throw new Error(t`Already posted on ${sourceName}.`);

    // login required
    const { currentProfile } = useTwitterStateStore.getState();
    if (!currentProfile?.profileId) throw new Error(t`Login required to post on ${sourceName}.`);

    const composeDraft = (postType: PostType, images: MediaObject[]) => {
        return {
            type: postType,
            postId: '',
            author: createDummyProfile(),
            metadata: {
                locale: 'en',
                content: {
                    content: readChars(chars),
                },
            },
            mediaObjects: images.map((media) => ({ url: media.imgur!, mimeType: media.file.type, id: media.id })),
            restriction,
            parentPostId: twitterParentPost?.postId ?? '',
            source: SocialPlatform.Twitter,
        } satisfies Post;
    };

    const postTo = createPostTo(SocialPlatform.Twitter, {
        uploadImages: async () => {
            const uploaded = await uploadToTwitter(images.map((x) => x.file));
            return uploaded.map((x) => ({
                id: x.media_id_string,
                url: '',
                file: x.file,
            }));
        },
        compose: (images) => TwitterSocialMediaProvider.publishPost(composeDraft('Post', images)),
        reply: (images) => {
            if (!twitterParentPost?.postId) throw new Error(t`No parent post found.`);
            return TwitterSocialMediaProvider.publishPost(composeDraft('Comment', images));
        },
        quote: (images) => {
            if (!twitterParentPost?.postId) throw new Error(t`No parent post found.`);
            return TwitterSocialMediaProvider.quotePost(twitterParentPost.postId, composeDraft('Quote', images));
        },
    });

    return postTo(type, compositePost);
}
