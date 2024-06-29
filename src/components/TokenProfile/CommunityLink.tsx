import { LinkIcon } from '@heroicons/react/24/outline';
import { skipToken, useQuery } from '@tanstack/react-query';

import DiscordRound from '@/assets/DiscordRound.svg';
import FacebookColored from '@/assets/FacebookColored.svg';
import GitHub from '@/assets/GitHub.svg';
import Instagram from '@/assets/Instagram.svg';
import Medium from '@/assets/Medium.svg';
import RedditRound from '@/assets/RedditRound.svg';
import TelegramRound from '@/assets/TelegramRound.svg';
import TwitterXRound from '@/assets/TwitterXRound.svg';
import YouTube from '@/assets/YouTube.svg';
import { Tooltip } from '@/components/Tooltip.js';
import { SourceInURL } from '@/constants/enum.js';
import { Link } from '@/esm/Link.js';
import { TwitterSocialMediaProvider } from '@/providers/twitter/SocialMedia.js';
import type { CommunityType, CommunityUrl } from '@/providers/types/Trending.js';

interface Props {
    link: CommunityUrl;
}

const brands: Record<CommunityType, React.ReactNode> = {
    discord: <DiscordRound width={16} height={16} />,
    facebook: <FacebookColored width={16} height={16} />,
    github: <GitHub width={16} height={16} />,
    instagram: <Instagram width={16} height={16} />,
    medium: <Medium width={16} height={16} />,
    reddit: <RedditRound width={16} height={16} />,
    telegram: <TelegramRound width={16} height={16} />,
    twitter: <TwitterXRound width={16} height={16} />,
    youtube: <YouTube width={16} height={16} />,
    other: <LinkIcon width={16} height={16} />,
};

export function CommunityLink({ link }: Props) {
    const isTwitter = link.type === 'twitter';
    const url = new URL(link.link);
    const handle = isTwitter ? url.pathname.slice(1) : null;
    const { data: fireflyTwitterLink } = useQuery({
        queryKey: ['twitter', 'profile-by-handle', handle],
        queryFn: handle ? () => TwitterSocialMediaProvider.getProfileByHandle(handle) : skipToken,
        select: (data) => `/profile/${data.profileId}?source=${SourceInURL.Twitter}`,
    });

    const href = isTwitter ? fireflyTwitterLink : link.link;

    if (!href || !brands[link.type]) return null;
    return (
        <Tooltip content={url.host} placement="top">
            <Link href={href} target={isTwitter ? undefined : '_blank'}>
                {brands[link.type]}
            </Link>
        </Tooltip>
    );
}
