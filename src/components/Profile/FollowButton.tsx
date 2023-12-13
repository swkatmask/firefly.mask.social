import { t } from '@lingui/macro';
import { useState } from 'react';

import LoadingIcon from '@/assets/loading.svg';
import { classNames } from '@/helpers/classNames.js';
import { useToggleFollow } from '@/hooks/useToggleFollow.js';
import type { Profile } from '@/providers/types/SocialMedia.js';

enum FollowLabel {
    Follow = 'Follow',
    Unfollow = 'Unfollow',
    Following = 'Following',
}

interface FollowButtonProps {
    profile: Profile;
    isMyProfile?: boolean;
}

export default function FollowButton({ profile, isMyProfile }: FollowButtonProps) {
    const [followHover, setFollowHover] = useState(false);
    const isFollowing = isMyProfile || profile?.viewerContext?.following;

    const [{ loading }, handleToggleFollow] = useToggleFollow({
        profileId: profile.profileId,
        handle: profile.handle,
        source: profile.source,
        isFollowed: !!isFollowing,
    });

    const buttonText = isFollowing ? (followHover ? t`Unfollow` : t`Following`) : t`Follow`;
    const buttonState = isFollowing ? (followHover ? FollowLabel.Unfollow : FollowLabel.Following) : FollowLabel.Follow;

    return (
        <button
            className={classNames(
                ' flex h-8 w-[100px] items-center justify-center rounded-full text-[15px] text-sm font-semibold transition-all',
                buttonState === FollowLabel.Follow ? ' bg-main text-primaryBottom hover:opacity-80' : '',
                buttonState === FollowLabel.Following ? ' border-[1.5px] border-lightMain text-lightMain' : '',
                buttonState === FollowLabel.Unfollow
                    ? ' border-[1.5px] border-danger border-opacity-50 bg-danger bg-opacity-20 text-danger text-opacity-50'
                    : '',
            )}
            disabled={loading}
            onMouseEnter={() => setFollowHover(true)}
            onMouseLeave={() => setFollowHover(false)}
            onClick={() => handleToggleFollow()}
        >
            {loading ? <LoadingIcon width={16} height={16} className="mr-2 animate-spin" /> : null}
            {buttonText}
        </button>
    );
}
