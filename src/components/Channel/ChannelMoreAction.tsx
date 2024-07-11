import { Menu, type MenuProps } from '@headlessui/react';
import { EllipsisHorizontalCircleIcon } from '@heroicons/react/24/outline';
import { t, Trans } from '@lingui/macro';
import { memo } from 'react';
import { useCopyToClipboard } from 'react-use';
import urlcat from 'urlcat';

import LoadingIcon from '@/assets/loading.svg';
import LinkIcon from '@/assets/small-link.svg';
import { MenuButton } from '@/components/Actions/MenuButton.js';
import { MuteChannelButton } from '@/components/Actions/MuteChannelButton.js';
import { MoreActionMenu } from '@/components/MoreActionMenu.js';
import { enqueueSuccessMessage } from '@/helpers/enqueueMessage.js';
import { getChannelUrl } from '@/helpers/getChannelUrl.js';
import { useIsLogin } from '@/hooks/useIsLogin.js';
import { useToggleMutedChannel } from '@/hooks/useToggleMutedChannel.js';
import type { Channel } from '@/providers/types/SocialMedia.js';

interface MoreProps extends Omit<MenuProps<'div'>, 'className'> {
    channel: Channel;
    className?: string;
}

export const ChannelMoreAction = memo<MoreProps>(function ChannelMoreAction({ channel }) {
    const [, copyToClipboard] = useCopyToClipboard();
    const isLogin = useIsLogin(channel.source);
    const [{ loading: channelBlocking }, toggleBlockChannel] = useToggleMutedChannel();

    return (
        <MoreActionMenu
            button={
                channelBlocking ? (
                    <span className="inline-flex h-8 w-8 animate-spin items-center justify-center">
                        <LoadingIcon width={16} height={16} />
                    </span>
                ) : (
                    <EllipsisHorizontalCircleIcon width={32} height={32} />
                )
            }
        >
            <Menu.Items
                className="absolute right-0 z-[1000] flex w-max flex-col gap-2 overflow-hidden rounded-2xl border border-line bg-primaryBottom py-3 text-base text-main"
                onClick={(event) => {
                    event.stopPropagation();
                    event.preventDefault();
                }}
            >
                <Menu.Item>
                    {({ close }) => (
                        <MenuButton
                            onClick={async () => {
                                close();
                                copyToClipboard(urlcat(location.origin, getChannelUrl(channel)));
                                enqueueSuccessMessage(t`Copied`);
                            }}
                        >
                            <LinkIcon width={18} height={18} />
                            <span className="font-bold leading-[22px] text-main">
                                <Trans>Copy link</Trans>
                            </span>
                        </MenuButton>
                    )}
                </Menu.Item>
                {isLogin ? (
                    <Menu.Item>
                        {({ close }) => (
                            <MuteChannelButton channel={channel} onToggle={toggleBlockChannel} onClick={close} />
                        )}
                    </Menu.Item>
                ) : null}
            </Menu.Items>
        </MoreActionMenu>
    );
});
