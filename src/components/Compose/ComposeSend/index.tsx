import { Trans } from '@lingui/macro';
import { safeUnreachable } from '@masknet/kit';
import { FireflyRedPacket } from '@masknet/web3-providers';
import { FireflyRedPacketAPI, type RedPacketJSONPayload } from '@masknet/web3-providers/types';
import { useQueryClient } from '@tanstack/react-query';
import { compact } from 'lodash-es';
import { useCallback, useMemo } from 'react';
import { useAsyncFn } from 'react-use';

import LoadingIcon from '@/assets/loading.svg';
import SendIcon from '@/assets/send.svg';
import { useSendFarcaster } from '@/components/Compose/ComposeSend/useSendFarcaster.js';
import { useSendLens } from '@/components/Compose/ComposeSend/useSendLens.js';
import { CountdownCircle } from '@/components/Compose/CountdownCircle.js';
import { SocialPlatform } from '@/constants/enum.js';
import { MAX_POST_SIZE } from '@/constants/index.js';
import { classNames } from '@/helpers/classNames.js';
import { measureChars } from '@/helpers/readChars.js';
import { RedPacketMetaKey } from '@/maskbook/packages/plugins/RedPacket/src/constants.js';
import { ComposeModalRef } from '@/modals/controls.js';
import { hasRedPacketPayload } from '@/modals/hasRedPacketPayload.js';
import { useComposeStateStore } from '@/store/useComposeStore.js';
import { useFarcasterStateStore, useLensStateStore } from '@/store/useProfileStore.js';

export default function ComposeSend() {
    const { chars, images, type, video, currentSource, availableSources, post } = useComposeStateStore();

    const { length, visibleLength, invisibleLength } = measureChars(chars);

    const sendLens = useSendLens();
    const sendFarcaster = useSendFarcaster();
    const queryClient = useQueryClient();
    const currentLensProfile = useLensStateStore.use.currentProfile();
    const currentFarcasterProfile = useFarcasterStateStore.use.currentProfile();

    const refreshProfileFeed = useCallback(
        async (source: SocialPlatform) => {
            switch (source) {
                case SocialPlatform.Lens:
                    await queryClient.invalidateQueries({
                        queryKey: ['getPostsByProfileId', SocialPlatform.Lens, currentLensProfile?.profileId],
                    });
                    queryClient.removeQueries({
                        queryKey: ['getPostsByProfileId', SocialPlatform.Lens, currentLensProfile?.profileId],
                    });
                    break;
                case SocialPlatform.Farcaster:
                    await queryClient.invalidateQueries({
                        queryKey: ['getPostsByProfileId', SocialPlatform.Farcaster, currentFarcasterProfile?.profileId],
                    });
                    queryClient.removeQueries({
                        queryKey: ['getPostsByProfileId', SocialPlatform.Farcaster, currentFarcasterProfile?.profileId],
                    });
                    break;
                default:
                    safeUnreachable(source);
                    return;
            }
        },
        [currentLensProfile, currentFarcasterProfile, queryClient],
    );
    const [{ loading }, handleSend] = useAsyncFn(async () => {
        if (!currentSource && type === 'compose') {
            const promises: Array<Promise<void>> = [];
            if (availableSources.includes(SocialPlatform.Lens)) promises.push(sendLens());
            if (availableSources.includes(SocialPlatform.Farcaster)) promises.push(sendFarcaster());

            const result = await Promise.allSettled(promises);
            if (result.every((x) => x.status === 'rejected')) return;

            if (availableSources.includes(SocialPlatform.Lens)) await refreshProfileFeed(SocialPlatform.Lens);
            if (availableSources.includes(SocialPlatform.Farcaster)) await refreshProfileFeed(SocialPlatform.Farcaster);

            // The modal will be closed when a platform sends a successful post.
        } else if (currentSource) {
            switch (currentSource) {
                case SocialPlatform.Lens:
                    await sendLens();
                    break;
                case SocialPlatform.Farcaster:
                    await sendFarcaster();
                    break;
                default:
                    safeUnreachable(currentSource);
            }
            refreshProfileFeed(currentSource);
        }

        try {
            const { lensPostId, farcasterPostId, typedMessage } = useComposeStateStore.getState();

            if (hasRedPacketPayload(typedMessage) && (lensPostId || farcasterPostId)) {
                const rpPayload = typedMessage?.meta?.get(RedPacketMetaKey) as RedPacketJSONPayload;

                const reactions = compact([
                    lensPostId
                        ? {
                              platform: FireflyRedPacketAPI.PlatformType.lens,
                              postId: lensPostId,
                          }
                        : undefined,
                    farcasterPostId
                        ? {
                              platform: FireflyRedPacketAPI.PlatformType.farcaster,
                              postId: farcasterPostId,
                              handle: currentFarcasterProfile?.handle,
                          }
                        : undefined,
                ]);

                const claimPlatform = compact([
                    lensPostId && currentLensProfile
                        ? {
                              platformId: currentLensProfile.profileId,
                              platformName: FireflyRedPacketAPI.PlatformType.lens,
                          }
                        : undefined,
                    farcasterPostId && currentFarcasterProfile
                        ? {
                              platformId: currentFarcasterProfile.profileId,
                              platformName: FireflyRedPacketAPI.PlatformType.farcaster,
                          }
                        : undefined,
                ]);
                await FireflyRedPacket.updateClaimStrategy(rpPayload.rpid, reactions, claimPlatform);
            }
        } finally {
            // Whether or not the update succeeds, you need to close the modal
            ComposeModalRef.close();
        }
    }, [
        currentSource,
        availableSources,
        type,
        sendLens,
        sendFarcaster,
        currentFarcasterProfile,
        currentLensProfile,
        refreshProfileFeed,
    ]);

    const disabled = useMemo(() => {
        if ((length === 0 || length > MAX_POST_SIZE) && images.length === 0 && !video) return true;

        const postBy = !post
            ? compact(
                  availableSources.map((x) => {
                      switch (x) {
                          case SocialPlatform.Lens:
                              return currentLensProfile?.source;
                          case SocialPlatform.Farcaster:
                              return currentFarcasterProfile?.source;
                          default:
                              safeUnreachable(x);
                              return;
                      }
                  }),
              )
            : [post.source];

        if (postBy.length === 0) return true;

        return false;
    }, [length, images, video, post, availableSources, currentLensProfile, currentFarcasterProfile]);

    return (
        <div className=" flex h-[68px] items-center justify-end gap-4 px-4 shadow-send">
            {visibleLength ? (
                <div className=" flex items-center gap-[10px] whitespace-nowrap text-[15px] text-main">
                    <CountdownCircle count={visibleLength} width={24} height={24} className="flex-shrink-0" />
                    <span className={classNames(disabled ? ' text-danger' : '')}>
                        {visibleLength} / {MAX_POST_SIZE - invisibleLength}
                    </span>
                </div>
            ) : null}

            <button
                disabled={disabled}
                className={classNames(
                    ' flex h-10 w-[120px] items-center justify-center gap-1 rounded-full bg-black text-[15px] font-bold text-white disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-black',
                )}
                onClick={() => {
                    if (!disabled) {
                        handleSend();
                    }
                }}
            >
                {loading ? (
                    <LoadingIcon width={16} height={16} className="animate-spin" />
                ) : (
                    <>
                        <SendIcon width={18} height={18} className="text-primaryBottom" />
                        <span>
                            <Trans>Send</Trans>
                        </span>
                    </>
                )}
            </button>
        </div>
    );
}
