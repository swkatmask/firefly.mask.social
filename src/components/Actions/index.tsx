import { compact } from 'lodash-es';
import { usePathname } from 'next/navigation.js';
import { memo } from 'react';
import urlcat from 'urlcat';

import { Bookmark } from '@/components/Actions/Bookmark.js';
import { Collect } from '@/components/Actions/Collect.js';
import { Comment } from '@/components/Actions/Comment.js';
import { Like } from '@/components/Actions/Like.js';
import { Mirror } from '@/components/Actions/Mirrors.js';
import { PostStatistics } from '@/components/Actions/PostStatistics.js';
import { Share } from '@/components/Actions/Share.js';
import { ClickableArea } from '@/components/ClickableArea.js';
import { Tips } from '@/components/Tips/index.js';
import { Source } from '@/constants/enum.js';
import { SITE_URL } from '@/constants/index.js';
import { classNames } from '@/helpers/classNames.js';
import { getPostUrl } from '@/helpers/getPostUrl.js';
import { isRoutePathname } from '@/helpers/isRoutePathname.js';
import { resolveFireflyProfileId } from '@/helpers/resolveFireflyProfileId.js';
import { useFireflyIdentity } from '@/hooks/useFireflyIdentity.js';
import { useIsSmall } from '@/hooks/useMediaQuery.js';
import { useToggleBookmark } from '@/hooks/useToggleBookmark.js';
import type { Post } from '@/providers/types/SocialMedia.js';

interface PostActionsWithGridProps extends React.HTMLAttributes<HTMLDivElement> {
    post: Post;
    disabled?: boolean;
    disablePadding?: boolean;
}

export const PostActionsWithGrid = memo<PostActionsWithGridProps>(function PostActionsWithGrid({
    className,
    post,
    disabled = false,
    disablePadding = false,
}) {
    const isComment = post.type === 'Comment';
    const identity = useFireflyIdentity(post.source, resolveFireflyProfileId(post.author) ?? '');
    const mutation = useToggleBookmark(post.source);
    const actions = compact([
        <div key="comment">
            <Comment
                disabled={disabled}
                count={post.stats?.comments}
                canComment={post.canComment}
                source={post.source}
                author={post.author.handle}
                post={post}
                hiddenCount
            />
        </div>,
        <div key="mirror">
            <Mirror
                disabled={disabled}
                shares={(post.stats?.mirrors || 0) + (post.stats?.quotes || 0)}
                source={post.source}
                postId={post.postId}
                post={post}
                hiddenCount
            />
        </div>,

        post.source !== Source.Farcaster && post.canAct ? (
            <div key="collect">
                <Collect
                    count={post.stats?.countOpenActions}
                    disabled={disabled}
                    collected={post.hasActed}
                    hiddenCount
                    post={post}
                />
            </div>
        ) : null,
        post.source !== Source.Twitter ? (
            <div key="like">
                <Like
                    isComment={isComment}
                    count={post.stats?.reactions}
                    hasLiked={post.hasLiked}
                    postId={post.postId}
                    source={post.source}
                    authorId={post.source === Source.Farcaster ? post.author.profileId : undefined}
                    disabled={disabled}
                    hiddenCount
                />
            </div>
        ) : null,
        identity.id ? (
            <Tips key="tips" post={post} identity={identity} disabled={disabled} handle={post.author.handle} />
        ) : null,
        post.source !== Source.Twitter ? (
            <Bookmark
                key="bookmark"
                count={post.stats?.bookmarks}
                disabled={disabled}
                hasBookmarked={post.hasBookmarked}
                onClick={() => {
                    mutation.mutate(post);
                }}
                hiddenCount
            />
        ) : null,
        <Share key="share" className="!flex-none" url={urlcat(SITE_URL, getPostUrl(post))} disabled={disabled} />,
    ]);

    return (
        <ClickableArea
            className={classNames('mt-2 flex items-center justify-between text-lightSecond', className, {
                'pl-[52px]': !disablePadding,
            })}
        >
            {actions}
        </ClickableArea>
    );
});

interface PostActionsProps extends React.HTMLAttributes<HTMLDivElement> {
    showChannelTag?: boolean;
    post: Post;
    disabled?: boolean;
    disablePadding?: boolean;
    hideDate?: boolean;
    onSetScrollIndex?: () => void;
}

export const PostActions = memo<PostActionsProps>(function PostActions({
    className,
    post,
    disabled = false,
    disablePadding = false,
    showChannelTag,
    hideDate,
    onSetScrollIndex,
    ...rest
}) {
    const pathname = usePathname();

    const isSmall = useIsSmall('max');
    const isComment = post.type === 'Comment';
    const isDetailPage = isRoutePathname(pathname, '/post/:detail', true);

    const identity = useFireflyIdentity(post.source, resolveFireflyProfileId(post.author) ?? '');

    const noLeftPadding = isDetailPage || isSmall || disablePadding;
    const mutation = useToggleBookmark(post.source);

    return (
        <div
            className={classNames('mt-2 text-xs text-lightSecond', className, {
                'pl-[52px]': !noLeftPadding,
            })}
            {...rest}
        >
            <ClickableArea className="flex justify-between">
                <div className="flex -translate-x-1.5 items-center space-x-2">
                    <Comment
                        disabled={disabled}
                        count={post.stats?.comments}
                        canComment={post.canComment}
                        source={post.source}
                        author={post.author.handle}
                        post={post}
                        hiddenCount
                    />
                    <Mirror
                        disabled={disabled}
                        shares={(post.stats?.mirrors || 0) + (post.stats?.quotes || 0)}
                        source={post.source}
                        postId={post.postId}
                        post={post}
                        hiddenCount
                    />
                    {post.source !== Source.Twitter ? (
                        <Like
                            isComment={isComment}
                            count={post.stats?.reactions}
                            hasLiked={post.hasLiked}
                            postId={post.postId}
                            source={post.source}
                            authorId={post.source === Source.Farcaster ? post.author.profileId : undefined}
                            disabled={disabled}
                            hiddenCount
                        />
                    ) : null}
                </div>
                <div className="flex translate-x-1.5 items-center space-x-2">
                    {post.source !== Source.Farcaster && post.canAct ? (
                        <Collect
                            post={post}
                            count={post.stats?.countOpenActions}
                            disabled={disabled}
                            collected={post.hasActed}
                            hiddenCount
                        />
                    ) : null}
                    {post.source !== Source.Twitter ? (
                        <Bookmark
                            onClick={() => {
                                mutation.mutate(post);
                            }}
                            count={post.stats?.bookmarks}
                            disabled={disabled}
                            hasBookmarked={post.hasBookmarked}
                            hiddenCount
                        />
                    ) : null}
                    {identity.id ? (
                        <Tips post={post} identity={identity} disabled={disabled} handle={post.author.handle} />
                    ) : null}
                    <Share key="share" url={urlcat(SITE_URL, getPostUrl(post))} disabled={disabled} />
                </div>
            </ClickableArea>
            <PostStatistics
                hideDate={hideDate}
                hideSource={hideDate}
                isComment={isComment}
                post={post}
                showChannelTag={showChannelTag}
                onSetScrollIndex={onSetScrollIndex}
            />
        </div>
    );
});
