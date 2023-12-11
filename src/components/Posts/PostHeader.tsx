import { memo, useMemo } from 'react';
import urlcat from 'urlcat';

import { MoreAction } from '@/components/Actions/More.js';
import { Image } from '@/components/Image.js';
import { SourceIcon } from '@/components/SourceIcon.js';
import { TimestampFormatter } from '@/components/TimeStampFormatter.js';
import { SocialPlatform } from '@/constants/enum.js';
import { Link } from '@/esm/Link.js';
import { classNames } from '@/helpers/classNames.js';
import { useDarkMode } from '@/hooks/useDarkMode.js';
import type { Post } from '@/providers/types/SocialMedia.js';
import { useFarcasterStateStore } from '@/store/useFarcasterStore.js';
import { useGlobalState } from '@/store/useGlobalStore.js';
import { useLensStateStore } from '@/store/useLensStore.js';

interface PostHeaderProps {
    post: Post;
    isQuote?: boolean;
}

export const PostHeader = memo<PostHeaderProps>(function PostHeader({ post, isQuote = false }) {
    const { isDarkMode } = useDarkMode();

    const currentLensProfile = useLensStateStore.use.currentProfile();
    const currentFarcasterProfile = useFarcasterStateStore.use.currentProfile();
    const currentSocialPlatform = useGlobalState.use.currentSocialPlatform();

    const isMyPost = useMemo(
        () =>
            currentSocialPlatform === SocialPlatform.Lens
                ? post.author.profileId === currentLensProfile?.profileId
                : post.author.profileId === currentFarcasterProfile?.profileId,
        [
            currentFarcasterProfile?.profileId,
            currentLensProfile?.profileId,
            currentSocialPlatform,
            post.author.profileId,
        ],
    );

    const profileLink = urlcat('/profile/:handle', { handle: post.author.handle });

    return (
        <div className="flex justify-between space-x-1.5">
            <div className="flex items-start space-x-3">
                <Link href={profileLink}>
                    <Image
                        loading="lazy"
                        className={classNames('z-[1] rounded-full border bg-secondary', {
                            'h-10': !isQuote,
                            'w-10': !isQuote,
                            'h-6': isQuote,
                            'w-6': isQuote,
                        })}
                        src={post.author.pfp}
                        fallback={!isDarkMode ? '/image/firefly-light-avatar.png' : '/image/firefly-dark-avatar.png'}
                        width={40}
                        height={40}
                        alt={post.author.profileId}
                    />
                </Link>

                <div className="flex max-w-sm items-center">
                    <div className="flex items-center space-x-2">
                        <Link href={profileLink} className="block text-[15px] font-bold leading-5">
                            {post.author.displayName}
                        </Link>
                        <Link href={profileLink} className="text-[15px] leading-6 text-secondary">
                            @{post.author.handle}
                        </Link>
                    </div>
                </div>
            </div>
            <div className="flex items-center space-x-2 self-baseline">
                <SourceIcon source={post.source} />
                <span className="text-[13px] leading-4 text-secondary">
                    <TimestampFormatter time={post.timestamp} />
                </span>
                {!isQuote && !isMyPost ? <MoreAction post={post} /> : null}
            </div>
        </div>
    );
});
