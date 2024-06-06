import { Menu, Transition } from '@headlessui/react';
import { t } from '@lingui/macro';
import { motion } from 'framer-motion';
import { Fragment } from 'react';

import MoreIcon from '@/assets/more.svg';
import { NFTReportSpamButton } from '@/components/Actions/NFTReportSpamButton.js';
import { Tooltip } from '@/components/Tooltip.js';

export function NFTMoreAction({ contractAddress }: { contractAddress: string }) {
    return (
        <Menu
            className="relative"
            as="div"
            onClick={(e) => {
                e.stopPropagation();
            }}
        >
            <Menu.Button
                whileTap={{ scale: 0.9 }}
                as={motion.button}
                className="flex items-center text-secondary"
                aria-label="More"
                onClick={async (event) => {
                    event.stopPropagation();
                }}
            >
                <Tooltip content={t`More`} placement="top">
                    <MoreIcon width={24} height={24} />
                </Tooltip>
            </Menu.Button>
            <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
            >
                <Menu.Items
                    className="absolute right-0 z-[1000] flex w-max flex-col gap-2 overflow-hidden rounded-2xl border border-line bg-primaryBottom py-3 text-base text-main"
                    onClick={(event) => {
                        event.stopPropagation();
                        event.preventDefault();
                    }}
                >
                    <Menu.Item>
                        {({ close }) => <NFTReportSpamButton onClick={close} contractAddress={contractAddress} />}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
