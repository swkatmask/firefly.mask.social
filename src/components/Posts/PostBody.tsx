'use client';

import { Select, t, Trans } from '@lingui/macro';
import { compact } from 'lodash-es';
import { useRouter } from 'next/navigation.js';
import { forwardRef, useMemo, useState } from 'react';
import { useInView } from 'react-cool-inview';
import { useAsync } from 'react-use';

import Lock from '@/assets/lock.svg';
import { NakedMarkup } from '@/components/Markup/NakedMarkup.js';
import { PostMarkup } from '@/components/Markup/PostMarkup.js';
import { PollCard } from '@/components/Poll/PollCard.js';
import { Attachments } from '@/components/Posts/Attachment.js';
import { CollapsedContent } from '@/components/Posts/CollapsedContent.js';
import { ContentTranslator } from '@/components/Posts/ContentTranslator.js';
import { PostLinks } from '@/components/Posts/PostLinks.js';
import { Quote } from '@/components/Posts/Quote.js';
import { IS_APPLE, IS_SAFARI } from '@/constants/bowser.js';
import { STATUS } from '@/constants/enum.js';
import { env } from '@/constants/env.js';
import { EMPTY_LIST } from '@/constants/index.js';
import { classNames } from '@/helpers/classNames.js';
import { formatUrl } from '@/helpers/formatUrl.js';
import { getEncryptedPayloadFromImageAttachment, getEncryptedPayloadFromText } from '@/helpers/getEncryptedPayload.js';
import { getPostUrl } from '@/helpers/getPostUrl.js';
import { isValidUrl } from '@/helpers/isValidUrl.js';
import { trimify } from '@/helpers/trimify.js';
import { useIsProfileMuted } from '@/hooks/useIsProfileMuted.js';
import type { Post } from '@/providers/types/SocialMedia.js';

interface PostBodyProps {
    post: Post;
    isQuote?: boolean;
    isReply?: boolean;
    isDetail?: boolean;
    showMore?: boolean;
    disablePadding?: boolean;
    showTranslate?: boolean;
}

export const PostBody = forwardRef<HTMLDivElement, PostBodyProps>(function PostBody(
    {
        post,
        isQuote = false,
        isReply = false,
        isDetail = false,
        showMore = false,
        disablePadding = false,
        showTranslate = false,
    },
    ref,
) {
    const router = useRouter();
    const { metadata, author } = post;
    const canShowMore = !!(metadata.content?.content && metadata.content.content.length > 450) && showMore;

    const [postContent, setPostContent] = useState(metadata.content?.content ?? '');
    const [postViewed, setPostViewed] = useState(false);

    const { observe } = useInView({
        rootMargin: '300px 0px',
        onChange: async ({ inView }) => {
            if (inView && !postViewed) setPostViewed(true);
        },
    });

    const { value: payloads } = useAsync(async () => {
        // decode the image upon post viewing, to reduce unnecessary load of images
        if (!postViewed) return;

        // mask web components are disabled
        if (env.external.NEXT_PUBLIC_MASK_WEB_COMPONENTS === STATUS.Disabled) return;

        return {
            payloadFromText: getEncryptedPayloadFromText(post),
            payloadFromImageAttachment: await getEncryptedPayloadFromImageAttachment(post),
        };
    }, [post, postViewed]);

    const muted = useIsProfileMuted(author, isDetail);

    const payloadFromImageAttachment = payloads?.payloadFromImageAttachment;
    const payloadImageUrl = payloadFromImageAttachment?.[2];
    const attachments = metadata.content?.attachments ?? EMPTY_LIST;

    const availableAttachments = useMemo(() => {
        if (!payloadImageUrl) return attachments;
        return attachments.filter((x) => x.uri !== payloadImageUrl);
    }, [payloadImageUrl, attachments]);

    const showAttachments = availableAttachments.length > 0 || !!metadata.content?.asset;
    const asset =
        metadata.content?.asset?.uri === payloadImageUrl && availableAttachments.length
            ? availableAttachments[0]
            : metadata.content?.asset;

    if (post.isEncrypted) {
        return (
            <div
                className={classNames('my-2', {
                    'pl-[52px]': !disablePadding,
                })}
                ref={ref}
            >
                <div
                    className={classNames(
                        'flex items-center gap-1 rounded-lg border-primaryMain px-3 py-[6px] text-[15px]',
                        {
                            border: !isQuote,
                        },
                    )}
                >
                    <Lock width={16} height={16} />
                    <Trans>Post has been encrypted</Trans>
                </div>
            </div>
        );
    }

    if (post.isHidden || muted) {
        return (
            <CollapsedContent
                className={classNames({
                    'pl-[52px]': !disablePadding,
                    'my-2': !isQuote,
                })}
                ref={ref}
                authorMuted={muted}
                isQuote={isQuote}
            />
        );
    }

    if (isQuote) {
        return (
            <div className="my-2 flex items-center space-x-2 break-words text-base text-main">
                <NakedMarkup
                    post={post}
                    className={classNames(
                        'linkify line-clamp-5 w-full self-stretch break-words text-[15px] opacity-75',
                        {
                            'max-h-[7.8rem]': IS_SAFARI && IS_APPLE,
                        },
                    )}
                >
                    {metadata.content?.content}
                </NakedMarkup>
                {showAttachments ? (
                    <Attachments
                        post={post}
                        asset={asset}
                        attachments={availableAttachments}
                        isQuote={!!metadata.content?.content?.length}
                    />
                ) : null}
            </div>
        );
    }

    if (isReply) {
        return (
            <div>
                <NakedMarkup
                    post={post}
                    className={classNames('line-clamp-3 w-full self-stretch break-words text-base text-main', {
                        'max-h-[7.8rem]': IS_SAFARI && IS_APPLE,
                    })}
                    components={{
                        // @ts-ignore
                        // eslint-disable-next-line react/no-unstable-nested-components
                        a: ({ title }) => <span>{title && isValidUrl(title) ? formatUrl(title, 30) : title}</span>,
                    }}
                >
                    {post.metadata.content?.content}
                </NakedMarkup>
                <div className="flex flex-col text-base text-main">
                    {post.metadata.content?.asset?.type ? (
                        <Select
                            value={post.metadata.content.asset.type}
                            _Image="[Image]"
                            _Video="[Video]"
                            _Audio="[Audio]"
                            _Poll="[Poll]"
                            other=""
                        />
                    ) : null}
                    {post.quoteOn ? <span>{t`[Quote]`}</span> : null}
                </div>
            </div>
        );
    }

    return (
        <div
            className={classNames('-mt-2 mb-2 break-words text-base text-main', {
                ['pl-[52px]']: !disablePadding,
            })}
            ref={ref}
        >
            <div ref={observe} />

            <PostMarkup post={post} canShowMore={canShowMore} content={postContent} />

            {showTranslate && trimify(postContent) ? (
                <ContentTranslator content={trimify(postContent)} canShowMore={canShowMore} post={post} />
            ) : null}

            {postViewed ? (
                payloads?.payloadFromImageAttachment || payloads?.payloadFromText ? (
                    <mask-decrypted-post
                        props={encodeURIComponent(
                            JSON.stringify({
                                post,
                                payloads: compact([payloads.payloadFromImageAttachment, payloads.payloadFromText]),
                            }),
                        )}
                    />
                ) : (
                    <mask-post-inspector props={encodeURIComponent(JSON.stringify({ post }))} />
                )
            ) : null}

            {canShowMore ? (
                <div className="text-[15px] font-bold text-link">
                    <div
                        onClick={() => {
                            router.push(getPostUrl(post));
                        }}
                    >
                        <Trans>Show More</Trans>
                    </div>
                </div>
            ) : null}

            {post.poll ? <PollCard post={post} /> : null}

            {showAttachments ? (
                <Attachments post={post} asset={asset} attachments={availableAttachments} isDetail={isDetail} />
            ) : null}

            <PostLinks post={post} setContent={setPostContent} />

            {!!post.quoteOn && !isQuote ? <Quote post={post.quoteOn} /> : null}
        </div>
    );
});
