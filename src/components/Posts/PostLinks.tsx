'use client';

import { useQuery } from '@tanstack/react-query';
import { last } from 'lodash-es';
import { useRouter } from 'next/navigation.js';
import { useEffect, useMemo } from 'react';

import { ArticleBody } from '@/components/Article/ArticleBody.js';
import { ActionContainer } from '@/components/Blink/ActionContainer.js';
import { FrameLayout } from '@/components/Frame/index.js';
import { OembedLayout } from '@/components/Oembed/index.js';
import { Player } from '@/components/Oembed/Player.js';
import { type SocialSource } from '@/constants/enum.js';
import { URL_REGEX } from '@/constants/regexp.js';
import type { Chars } from '@/helpers/chars.js';
import { readChars } from '@/helpers/chars.js';
import { createDummyPost } from '@/helpers/createDummyPost.js';
import { getArticleUrl } from '@/helpers/getArticleUrl.js';
import { isLinkMatchingHost } from '@/helpers/isLinkMatchingHost.js';
import { removeAtEnd } from '@/helpers/removeAtEnd.js';
import { resolveOembedUrl } from '@/helpers/resolveOembedUrl.js';
import { useActionAdapter } from '@/hooks/useActionAdapter.js';
import type { Post } from '@/providers/types/SocialMedia.js';
import { getPostLinks } from '@/services/getPostLinks.js';
import type { ComposeType } from '@/types/compose.js';

interface Props {
    post: Post;
    setContent?: (content: string) => void;
    isInCompose?: boolean;
}

export function PostLinks({ post, setContent, isInCompose = false }: Props) {
    const router = useRouter();
    const url = resolveOembedUrl(post);
    const { isLoading, error, data } = useQuery({
        queryKey: ['post-embed', url, post.postId],
        queryFn: () => getPostLinks(url!, post),
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        retry: false,
        enabled: !!url,
    });

    const actionAdapter = useActionAdapter();
    useEffect(() => {
        if (data?.action) {
            data.action.setAdapter(actionAdapter);
        }
    }, [actionAdapter, data?.action]);

    useEffect(() => {
        const content = post.metadata.content?.content;
        if (data && url && content) {
            setContent?.(removeAtEnd(content, url));
        }
    }, [data, setContent, post, url]);

    if (!url || isLoading || error || !data) return null;

    return (
        <>
            {data.article ? (
                <ArticleBody
                    article={data.article}
                    onClick={() => {
                        if (!data.article || data.article.author.isMuted) return;

                        const selection = window.getSelection();
                        if (selection && selection.toString().length !== 0) return;

                        if (isInCompose) return;

                        router.push(getArticleUrl(data.article));
                        return;
                    }}
                />
            ) : null}
            {data.html ? (
                <Player html={data.html} isSpotify={isLinkMatchingHost(url, 'open.spotify.com', false)} />
            ) : null}
            {data.frame ? <FrameLayout frame={data.frame} post={post} /> : null}
            {data.action ? <ActionContainer action={data.action} /> : null}
            {data.oembed ? <OembedLayout data={data.oembed} post={post} /> : null}
        </>
    );
}

export function PostLinksInCompose({
    type,
    chars,
    source,
    parentPost,
}: {
    chars: Chars;
    source: SocialSource;
    type: ComposeType;
    parentPost?: Post | null;
}) {
    const post = useMemo(() => {
        const content = readChars(chars, 'visible');
        const oembedUrls = content.match(URL_REGEX) || [];
        const oembedUrl = last(oembedUrls);

        return {
            ...createDummyPost(source, content, oembedUrl, oembedUrls),
            quoteOn: type === 'quote' ? parentPost ?? undefined : undefined,
        } satisfies Post;
    }, [chars, parentPost, source, type]);

    return <PostLinks post={post} isInCompose />;
}
