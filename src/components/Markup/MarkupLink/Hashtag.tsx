'use client';

import { useRouter } from 'next/navigation.js';
import { memo, useEffect } from 'react';
import urlcat from 'urlcat';

import type { MarkupLinkProps } from '@/components/Markup/MarkupLink/index.js';
import { PageRoute, SearchType } from '@/constants/enum.js';

export const Hashtag = memo<Omit<MarkupLinkProps, 'post'>>(function Hashtag({ title }) {
    const router = useRouter();

    useEffect(() => {
        if (title) router.prefetch(PageRoute.Search);
    }, [title, router]);

    if (!title) return null;

    const tag = title.slice(1).toLowerCase();

    return (
        <span
            className="text-link"
            onClick={(event) => {
                event.stopPropagation();
                event.preventDefault();
                scrollTo(0, 0);
                router.push(urlcat(PageRoute.Search, { q: `#${tag}`, type: SearchType.Posts }));
            }}
        >
            {title}
        </span>
    );
});
