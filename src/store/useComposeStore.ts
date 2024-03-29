import type { TypedMessageTextV1 } from '@masknet/typed-message';
import { uniq } from 'lodash-es';
import { type Dispatch, type SetStateAction } from 'react';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

import { SocialPlatform } from '@/constants/enum.js';
import { EMPTY_LIST } from '@/constants/index.js';
import { createSelectors } from '@/helpers/createSelector.js';
import { type Chars, readChars } from '@/helpers/readChars.js';
import { FrameLoader } from '@/libs/frame/Loader.js';
import { OpenGraphLoader } from '@/libs/og/Loader.js';
import type { Post } from '@/providers/types/SocialMedia.js';
import { RestrictionType } from '@/types/compose.js';
import type { Frame } from '@/types/frame.js';
import type { MediaObject } from '@/types/index.js';
import type { OpenGraph } from '@/types/og.js';
import type { RedPacketPayload } from '@/types/rp.js';

type Cursor = number;

// A recursive version of Post will cause typescript failed to infer the type of the final exports.
type OrphanPost = Omit<Post, 'embedPosts' | 'comments' | 'root' | 'commentOn' | 'quoteOn'>;

interface ComposePostState {
    id: Cursor;

    // the parent post id
    lensPostId: string | null;
    farcasterPostId: string | null;

    restriction: RestrictionType;
    availableSources: SocialPlatform[];

    chars: Chars;
    post: OrphanPost | null;
    typedMessage: TypedMessageTextV1 | null;
    video: MediaObject | null;
    images: MediaObject[];
    // parsed frames from urls in chars
    frames: Frame[];
    // parsed open graphs from url in chars
    openGraphs: OpenGraph[];
    redPacketPayload: RedPacketPayload | null;
}

interface ComposeState {
    type: 'compose' | 'quote' | 'reply';
    cursor: Cursor;
    posts: ComposePostState[];
    computed: Omit<ComposePostState, 'id'>;

    // operations
    updateCursor: (cursor: Cursor) => void;
    enableSource: (source: SocialPlatform) => void;
    disableSource: (source: SocialPlatform) => void;
    updateRestriction: (restriction: RestrictionType) => void;
    updateAvailableSources: (sources: SocialPlatform[]) => void;
    updateType: (type: 'compose' | 'quote' | 'reply') => void;
    updateChars: Dispatch<SetStateAction<Chars>>;
    updateTypedMessage: (typedMessage: TypedMessageTextV1 | null) => void;
    updatePost: (post: OrphanPost | null) => void;
    updateVideo: (video: MediaObject | null) => void;
    updateImages: Dispatch<SetStateAction<MediaObject[]>>;
    addImage: (image: MediaObject) => void;
    removeImage: (image: MediaObject) => void;
    addFrame: (frame: Frame) => void;
    removeFrame: (frame: Frame) => void;
    removeOpenGraph: (og: OpenGraph) => void;
    updateLensPostId: (postId: string | null) => void;
    updateFarcasterPostId: (postId: string | null) => void;
    updateRedPacketPayload: (value: RedPacketPayload) => void;
    loadFramesFromChars: () => Promise<void>;
    loadOpenGraphsFromChars: () => Promise<void>;
    clear: () => void;
}

function createInitSinglePostState(cursor: Cursor): ComposePostState {
    return {
        id: cursor,
        lensPostId: null,
        farcasterPostId: null,
        availableSources: [SocialPlatform.Farcaster, SocialPlatform.Lens] as SocialPlatform[],
        restriction: RestrictionType.Everyone,
        post: null,
        chars: '',
        typedMessage: null,
        images: EMPTY_LIST,
        frames: EMPTY_LIST,
        openGraphs: EMPTY_LIST,
        video: null,
        redPacketPayload: null,
    };
}

const pick = <T>(s: ComposeState, _: (post: ComposePostState) => T): T => _(s.posts.find((x) => x.id === s.cursor)!);

const next = (s: ComposeState, _: (post: ComposePostState) => ComposePostState): ComposeState => ({
    ...s,
    posts: s.posts.map((x) => (x.id === s.cursor ? _(x) : x)),
});

const useComposeStateBase = create<ComposeState, [['zustand/immer', unknown]]>(
    immer<ComposeState>((set, get) => ({
        type: 'compose',
        cursor: 0,
        posts: [createInitSinglePostState(0)],

        computed: {
            get availableSources() {
                return pick(get(), (x) => x.availableSources);
            },
            get restriction() {
                return pick(get(), (x) => x.restriction);
            },
            get post() {
                return pick(get(), (x) => x.post);
            },
            get chars() {
                return pick(get(), (x) => x.chars);
            },
            get typedMessage() {
                return pick(get(), (x) => x.typedMessage);
            },
            get images() {
                return pick(get(), (x) => x.images);
            },
            get frames() {
                return pick(get(), (x) => x.frames);
            },
            get openGraphs() {
                return pick(get(), (x) => x.openGraphs);
            },
            get video() {
                return pick(get(), (x) => x.video);
            },
            get redPacketPayload() {
                return pick(get(), (x) => x.redPacketPayload);
            },
            get lensPostId() {
                return pick(get(), (x) => x.lensPostId);
            },
            get farcasterPostId() {
                return pick(get(), (x) => x.farcasterPostId);
            },
        },

        updateCursor: (cursor) =>
            set((state) => {
                state.cursor = cursor;
            }),
        updateType: (type: 'compose' | 'quote' | 'reply') =>
            set((state) => {
                state.type = type;
            }),
        updateRestriction: (restriction) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    restriction,
                })),
            ),
        updateChars: (chars) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    chars: typeof chars === 'function' ? chars(post.chars) : chars,
                })),
            ),
        updateTypedMessage: (typedMessage: TypedMessageTextV1 | null) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    typedMessage,
                })),
            ),
        updateImages: (images) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    images: typeof images === 'function' ? images(post.images) : images,
                })),
            ),
        updatePost: (orphanPost) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    post: orphanPost,
                })),
            ),
        updateVideo: (video) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    video,
                })),
            ),
        addImage: (image) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    images: [...post.images, image],
                })),
            ),
        removeImage: (target) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    images: post.images.filter((image) => image.file !== target.file),
                })),
            ),
        addFrame: (frame) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    frames: [...post.frames, frame],
                })),
            ),
        removeFrame: (target) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    frames: post.frames.filter((frame) => frame !== target),
                })),
            ),
        removeOpenGraph: (target) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    openGraphs: post.openGraphs.filter((openGraph) => openGraph !== target),
                })),
            ),
        updateLensPostId: (postId) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    lensPostId: postId,
                })),
            ),
        updateFarcasterPostId: (postId) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    farcasterPostId: postId,
                })),
            ),
        updateRedPacketPayload: (payload) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    redPacketPayload: payload,
                })),
            ),
        enableSource: (source) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    availableSources: uniq([...post.availableSources, source]),
                })),
            ),
        disableSource: (source) =>
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    availableSources: post.availableSources.filter((s) => s !== source),
                })),
            ),
        updateAvailableSources: (sources) => {
            set((state) =>
                next(state, (post) => ({
                    ...post,
                    availableSources: sources,
                })),
            );
        },
        loadFramesFromChars: async () => {
            const chars = pick(get(), (x) => x.chars);
            const frames = await FrameLoader.occupancyLoad(readChars(chars, true));

            set((state) =>
                next(state, (post) => ({
                    ...post,
                    frames,
                })),
            );
        },
        loadOpenGraphsFromChars: async () => {
            const chars = pick(get(), (x) => x.chars);
            const openGraphs = await OpenGraphLoader.occupancyLoad(readChars(chars, true));

            set((state) =>
                next(state, (post) => ({
                    ...post,
                    openGraphs,
                })),
            );
        },
        clear: () =>
            set((state) =>
                Object.assign(state, {
                    type: 'compose',
                    cursor: 0,
                    posts: [createInitSinglePostState(0)],
                }),
            ),
    })),
);

export const useComposeStateStore = createSelectors(useComposeStateBase);
