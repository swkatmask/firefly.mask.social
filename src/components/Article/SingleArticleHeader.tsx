'use client';
import { memo } from 'react';
import urlcat from 'urlcat';
import { useEnsName } from 'wagmi';

import { ArticleMoreAction } from '@/components/Actions/ArticleMore.js';
import { Avatar } from '@/components/Avatar.js';
import { TimestampFormatter } from '@/components/TimeStampFormatter.js';
import { SourceInURL } from '@/constants/enum.js';
import { Link } from '@/esm/Link.js';
import { classNames } from '@/helpers/classNames.js';
import { formatEthereumAddress } from '@/helpers/formatAddress.js';
import { resolveArticlePlatformIcon } from '@/helpers/resolveArticlePlatformIcon.js';
import type { Article } from '@/providers/types/Article.js';

interface SingleArticleHeaderProps {
    article: Article;
    className?: string;
    isBookmark?: boolean;
}

export const SingleArticleHeader = memo<SingleArticleHeaderProps>(function SingleArticleHeader({
    article,
    className,
    isBookmark,
}) {
    const authorUrl = urlcat('/profile/:address', {
        address: article.author.id,
        source: SourceInURL.Wallet,
    });

    const Icon = resolveArticlePlatformIcon(article.platform);

    const { data: ens } = useEnsName({ address: article.author.id, query: { enabled: !article.author.handle } });

    return (
        <div className={classNames('flex items-start gap-3', className)}>
            <Link href={authorUrl} className="z-[1]" onClick={(event) => event.stopPropagation()}>
                <Avatar
                    className="h-10 w-10"
                    src={article.author.avatar}
                    size={40}
                    alt={article.author.handle || article.author.id}
                />
            </Link>

            <div className="flex max-w-[calc(100%-40px-88px-24px)] flex-1 items-center gap-2 overflow-hidden">
                <Link
                    href={authorUrl}
                    onClick={(event) => event.stopPropagation()}
                    className="block truncate text-clip text-medium font-bold leading-5 text-main"
                >
                    {article.author.handle || ens}
                </Link>
                <Link href={authorUrl} className="truncate text-clip text-medium leading-6 text-secondary">
                    {formatEthereumAddress(article.author.id, 4)}
                </Link>
            </div>
            <div className="ml-auto flex items-center space-x-2">
                {Icon ? <Icon width={20} height={20} /> : null}
                <span className="whitespace-nowrap text-xs leading-4 text-secondary md:text-[13px]">
                    <TimestampFormatter time={article.timestamp} />
                </span>
                {isBookmark ? <ArticleMoreAction article={article} /> : null}
            </div>
        </div>
    );
});
