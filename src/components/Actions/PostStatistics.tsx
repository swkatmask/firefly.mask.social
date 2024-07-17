import { t, Trans } from '@lingui/macro';
import { compact } from 'lodash-es';
import { usePathname } from 'next/navigation.js';
import { Fragment, type HTMLProps, memo, useMemo } from 'react';

import FireflyAvatarIcon from '@/assets/firefly-avatar.svg';
import { ChannelAnchor } from '@/components/Posts/ChannelAnchor.js';
import { EngagementType, Source } from '@/constants/enum.js';
import { Link } from '@/esm/Link.js';
import { classNames } from '@/helpers/classNames.js';
import { nFormatter } from '@/helpers/formatCommentCounts.js';
import { isRoutePathname } from '@/helpers/isRoutePathname.js';
import { resolveEngagementLink } from '@/helpers/resolveEngagementLink.js';
import { useIsSmall } from '@/hooks/useMediaQuery.js';
import type { Post } from '@/providers/types/SocialMedia.js';
import { useImpressionsStore } from '@/store/useImpressionsStore.js';

interface Props extends HTMLProps<HTMLDivElement> {
    post: Post;
    showChannelTag?: boolean;

    onSetScrollIndex?: () => void;
}

function countText(count?: number, singular?: string, plural?: string) {
    if (!count) return null;
    const countFormatted = nFormatter(count).toUpperCase();
    if (count === 1) return `${countFormatted} ${singular}`;
    return `${countFormatted} ${plural}`;
}

function EngagementLink(props: {
    post: Post;
    type: EngagementType;
    count?: number;
    singular?: string;
    plural?: string;
    onSetScrollIndex?: () => void;
}) {
    const count = countText(props.count, props.singular, props.plural);
    if (!count) return null;
    return (
        <Link
            className="hover:underline"
            href={resolveEngagementLink(props.post.postId, props.post.source, props.type)}
            onClick={(ev) => {
                ev.stopPropagation();
                props.onSetScrollIndex?.();
            }}
        >
            {count}
        </Link>
    );
}

export const PostStatistics = memo<Props>(function PostStatistics({
    className,
    post,
    showChannelTag = true,
    onSetScrollIndex,
}: Props) {
    const pathname = usePathname();
    const publicationViews = useImpressionsStore.use.publicationViews();
    const viewCount = useMemo(
        () => publicationViews.find((x) => x.id === post.postId)?.views,
        [publicationViews, post],
    );
    const comments = post.stats?.comments ? (
        <span className="hover:underline">{countText(post.stats.comments, t`comment`, t`comments`)}</span>
    ) : null;
    const likes = post.stats?.reactions ? (
        <EngagementLink
            post={post}
            count={post.stats.reactions}
            singular={t`like`}
            plural={t`likes`}
            type={EngagementType.Likes}
            onSetScrollIndex={onSetScrollIndex}
        />
    ) : null;
    const collects = countText(post.stats?.countOpenActions, t`collect`, t`collects`);
    const mirrors = post.stats?.mirrors ? (
        post.source === Source.Farcaster ? (
            <EngagementLink
                post={post}
                type={EngagementType.Recasts}
                count={post.stats.mirrors}
                singular={t`recast`}
                plural={t`recasts`}
                onSetScrollIndex={onSetScrollIndex}
            />
        ) : (
            <EngagementLink
                post={post}
                type={EngagementType.Mirrors}
                count={post.stats.mirrors}
                singular={t`mirror`}
                plural={t`mirrors`}
                onSetScrollIndex={onSetScrollIndex}
            />
        )
    ) : null;
    const quotes = post.stats?.quotes ? (
        <EngagementLink
            post={post}
            type={EngagementType.Quotes}
            count={post.stats.quotes}
            singular={t`quote`}
            plural={t`quotes`}
            onSetScrollIndex={onSetScrollIndex}
        />
    ) : null;
    const views = countText(viewCount, t`view`, t`views`);
    const isSmall = useIsSmall();

    const sendFrom = post.sendFrom?.displayName === 'Firefly App' ? 'Firefly' : post.sendFrom?.displayName;
    const isFirefly = sendFrom?.toLowerCase() === 'firefly';

    const isDetailPage = isRoutePathname(pathname, '/post/:detail');

    return (
        <div className={classNames('min-h-6 flex w-full justify-between text-xs leading-6 text-second', className)}>
            <div>
                {(!isDetailPage
                    ? compact([
                          comments,
                          likes,
                          !isDetailPage && !isSmall && sendFrom ? (
                              <span>
                                  <Trans>
                                      via{' '}
                                      {isFirefly ? (
                                          <FireflyAvatarIcon fontSize={15} width={15} height={15} className="inline" />
                                      ) : null}{' '}
                                      <span className="capitalize">{sendFrom}</span>
                                  </Trans>
                              </span>
                          ) : null,
                          !isDetailPage && !isSmall && showChannelTag && post.channel ? (
                              <ChannelAnchor
                                  className="!inline-flex translate-y-1"
                                  channel={post.channel}
                                  onClick={onSetScrollIndex}
                              />
                          ) : null,
                      ])
                    : compact([
                          likes,
                          collects,
                          mirrors,
                          quotes,
                          views,
                          sendFrom ? (
                              <Trans>
                                  Posted via{' '}
                                  {isFirefly ? (
                                      <FireflyAvatarIcon fontSize={15} width={15} height={15} className="inline" />
                                  ) : null}{' '}
                                  <span className="capitalize">{sendFrom}</span>
                              </Trans>
                          ) : null,
                      ])
                ).map((item, i, arr) => {
                    const isLast = arr.length - 1 === i;
                    return (
                        <Fragment key={i}>
                            <span>{item}</span>
                            {!isLast ? <span>{' · '}</span> : null}
                        </Fragment>
                    );
                })}
            </div>
            {!isDetailPage && isSmall ? (
                <div className="flex items-center">
                    {sendFrom ? (
                        <div>
                            <Trans>
                                via{' '}
                                {isFirefly ? (
                                    <FireflyAvatarIcon fontSize={15} width={15} height={15} className="inline" />
                                ) : null}{' '}
                                <span className="capitalize">{sendFrom}</span>
                            </Trans>
                        </div>
                    ) : null}
                    {showChannelTag && post.channel ? (
                        <>
                            {sendFrom ? <div className="w-3 text-center">{' · '}</div> : null}
                            <ChannelAnchor channel={post.channel} onClick={onSetScrollIndex} />
                        </>
                    ) : null}
                </div>
            ) : null}
        </div>
    );
});
