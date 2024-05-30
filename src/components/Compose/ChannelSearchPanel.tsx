import { Popover, Transition } from '@headlessui/react';
import { Trans } from '@lingui/macro';
import { Fragment, useState } from 'react';

import FarcasterIcon from '@/assets/farcaster.svg';
import LoadingIcon from '@/assets/loading.svg';
import SearchIcon from '@/assets/search.svg';
import UserIcon from '@/assets/user.svg';
import { Avatar } from '@/components/Avatar.js';
import { CircleCheckboxIcon } from '@/components/CircleCheckboxIcon.js';
import { SearchInput } from '@/components/Search/SearchInput.js';
import { classNames } from '@/helpers/classNames.js';
import { nFormatter } from '@/helpers/formatCommentCounts.js';
import { isSameChannel } from '@/helpers/isSameChannel.js';
import { hasRpPayload } from '@/helpers/rpPayload.js';
import { useCompositePost } from '@/hooks/useCompositePost.js';
import { useSearchChannels } from '@/hooks/useSearchChannel.js';
import type { Channel } from '@/providers/types/SocialMedia.js';
import { useComposeStateStore } from '@/store/useComposeStore.js';

interface ChannelSearchPanelProps {
    onSelected?: () => void;
}

export function ChannelSearchPanel({ onSelected }: ChannelSearchPanelProps) {
    const [inputText, setInputText] = useState('');
    const { updateChannel } = useComposeStateStore();
    const { channel: selectedChannel, typedMessage } = useCompositePost();

    const { data, isLoading, isError } = useSearchChannels(inputText, hasRpPayload(typedMessage) ?? false);

    const InputBox = (
        <div className="relative mx-3 flex flex-grow items-center rounded-xl bg-lightBg px-3 text-main">
            <SearchIcon width={18} height={18} className="shrink-0" />
            <SearchInput
                className="h-8"
                value={inputText}
                onChange={(ev) => setInputText(ev.target.value)}
                onClear={() => setInputText('')}
            />
        </div>
    );
    const renderChannelIcon = (channel: Channel) => {
        if (channel.id === 'home' && !channel.imageUrl) {
            return <FarcasterIcon className="mr-2 h-6 w-6" />;
        }
        return (
            <Avatar
                className="mr-2 shrink-0 rounded-full border "
                src={channel.imageUrl}
                size={24}
                alt={channel.name}
            />
        );
    };

    const ListBox = (
        <div className="no-scrollbar flex max-h-[280px] flex-col gap-2 overflow-auto">
            {isLoading ? (
                <div className="m-auto flex h-[100px] items-center justify-center text-center text-sm text-main">
                    <LoadingIcon className="animate-spin" width={24} height={24} />
                </div>
            ) : isError ? (
                <div className="m-auto flex h-[100px] items-center justify-center text-center text-sm text-main">
                    <Trans>Something went wrong. Please try again.</Trans>
                </div>
            ) : !data?.length ? (
                <div className="m-auto flex h-[100px] items-center justify-center text-center text-sm text-main">
                    <Trans>There is no data available for display.</Trans>
                </div>
            ) : (
                data?.map((channel) => {
                    const isSelected = isSameChannel(channel, selectedChannel[channel.source]);
                    return (
                        <Fragment key={channel.id}>
                            <div
                                className="flex h-[32px] cursor-pointer items-center justify-between pl-3 pr-1 transition duration-150 ease-in hover:bg-lightBg"
                                onClick={() => {
                                    if (!isSelected) updateChannel(channel);
                                    onSelected?.();
                                }}
                            >
                                <div
                                    className="flex h-[24px] items-center overflow-hidden"
                                    style={{ width: 'calc(100% - 40px)' }}
                                >
                                    {renderChannelIcon(channel)}
                                    <div
                                        className="flex items-center gap-1 text-secondary"
                                        style={{ width: 'calc(100% - 34px)' }}
                                    >
                                        <span
                                            className={classNames(
                                                'max-w-[70%] truncate font-bold',
                                                isSelected ? 'text-main' : '',
                                            )}
                                        >
                                            {channel.name}
                                        </span>
                                        {channel.followerCount ? (
                                            <>
                                                <UserIcon width={16} height={16} />
                                                <span className="">{nFormatter(channel.followerCount)}</span>
                                            </>
                                        ) : null}
                                    </div>
                                </div>
                                <CircleCheckboxIcon checked={isSelected} />
                            </div>
                        </Fragment>
                    );
                })
            )}
        </div>
    );

    return (
        <Transition
            as={Fragment}
            enter="transition ease-out duration-200"
            enterFrom="opacity-0 translate-y-1"
            enterTo="opacity-100"
            leave="transition ease-in duration-150"
            leaveFrom="opacity-100"
            leaveTo="opacity-0 translate-y-1"
        >
            <Popover.Panel className=" absolute bottom-full right-0 flex w-[350px] -translate-y-3 flex-col gap-2 rounded-lg bg-lightBottom py-3 text-[15px] shadow-popover dark:border dark:border-line dark:bg-darkBottom dark:shadow-none">
                {InputBox}
                {ListBox}
            </Popover.Panel>
        </Transition>
    );
}
