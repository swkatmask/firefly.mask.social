import { Avatar } from '@/components/Avatar.js';
import { FollowButton } from '@/components/Profile/FollowButton.js';
import { ProfileTippy } from '@/components/Profile/ProfileTippy.js';
import { SocialSourceIcon } from '@/components/SocialSourceIcon.js';
import { type SocialSource, Source } from '@/constants/enum.js';
import { Link } from '@/esm/Link.js';
import { resolveProfileUrl } from '@/helpers/resolveProfileUrl.js';
import { useIsProfileMuted } from '@/hooks/useIsProfileMuted.js';
import type { Profile } from '@/providers/types/SocialMedia.js';

export function SuggestedFollowUser({ profile, source }: { profile: Profile; source: SocialSource }) {
    const muted = useIsProfileMuted(profile);
    return (
        <Link
            href={resolveProfileUrl(source, source === Source.Lens ? profile.handle : profile.profileId)}
            className="flex w-full px-4 py-2 hover:bg-bg"
        >
            <div className="flex w-full items-center">
                <ProfileTippy source={source} identity={profile.profileId}>
                    <Avatar
                        className="mr-3 shrink-0 rounded-full border"
                        src={profile?.pfp || profile.pfp}
                        size={40}
                        alt={profile.handle}
                    />
                </ProfileTippy>
                <div className="mr-auto flex max-w-[calc(100%-16px-40px-16px-32px)] flex-col">
                    <div className="flex-start flex items-center truncate text-sm font-bold leading-5">
                        <div className="text-l mr-2 max-w-full truncate">{profile.displayName}</div>
                        <SocialSourceIcon source={source} size={16} />
                    </div>
                    <div className="flex items-center gap-2 text-[15px] text-sm leading-[24px] text-secondary">
                        <p className="truncate">@{profile.handle}</p>
                    </div>
                </div>
                {!muted ? (
                    <div>
                        <FollowButton profile={profile} variant="icon" />
                    </div>
                ) : null}
            </div>
        </Link>
    );
}
