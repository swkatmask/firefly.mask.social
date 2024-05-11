import { motion } from 'framer-motion';
import { isUndefined } from 'lodash-es';
import { usePathname, useRouter } from 'next/navigation.js';
import { memo } from 'react';

import { PostActions } from '@/components/Actions/index.js';
import { FeedActionType } from '@/components/Posts/ActionType.js';
import { PostBody } from '@/components/Posts/PostBody.js';
import { PostHeader } from '@/components/Posts/PostHeader.js';
import { Source } from '@/constants/enum.js';
import { classNames } from '@/helpers/classNames.js';
import { getPostUrl } from '@/helpers/getPostUrl.js';
import { isRoutePathname } from '@/helpers/isRoutePathname.js';
import type { Post } from '@/providers/types/SocialMedia.js';
import { useGlobalState } from '@/store/useGlobalStore.js';

interface ThreadBodyProps {
    post: Post;
    disableAnimate?: boolean;
    isLast?: boolean;
    listKey?: string;
    index?: number;
}

export const ThreadBody = memo<ThreadBodyProps>(function ThreadBody({
    post,
    disableAnimate,
    isLast = false,
    listKey,
    index,
}) {
    const setScrollIndex = useGlobalState.use.setScrollIndex();
    const router = useRouter();

    const pathname = usePathname();
    const isPostPage = isRoutePathname(pathname, '/post/:detail', true);

    const link = getPostUrl(post);

    return (
        <motion.article
            initial={!disableAnimate ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="cursor-pointer bg-bottom"
            onClick={() => {
                if (post.source === Source.Twitter) return;
                const selection = window.getSelection();
                if (selection && selection.toString().length !== 0) return;
                if (!isPostPage) router.push(link);
            }}
        >
            <FeedActionType post={post} isThread />
            <PostHeader
                post={post}
                onClickProfileLink={() => {
                    if (listKey && !isUndefined(index)) setScrollIndex(listKey, index);
                }}
            />
            <div className="flex">
                <div
                    className={classNames('ml-5 mr-8 border-[0.8px] ', {
                        'border-transparent bg-transparent dark:border-transparent dark:bg-none': isLast,
                        'border-gray-300 bg-gray-300 dark:border-gray-700 dark:bg-gray-700': !isLast,
                    })}
                />

                <div className={'w-full max-w-[calc(100%_-_53px)] pb-5'}>
                    <PostBody post={post} disablePadding />
                    <PostActions post={post} disabled={post.isHidden} disablePadding />
                </div>
            </div>
        </motion.article>
    );
});
