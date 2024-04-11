'use client';

import { t } from '@lingui/macro';
import { formatDomainName, formatEthereumAddress } from '@masknet/web3-shared-evm';
import { useAccount, useEnsName } from 'wagmi';
import { mainnet } from 'wagmi/chains';

import WalletIcon from '@/assets/wallet.svg';
import { Tooltip } from '@/components/Tooltip.js';
import { classNames } from '@/helpers/classNames.js';
import { resolve } from '@/helpers/resolve.js';
import { useMounted } from '@/hooks/useMounted.js';
import { AccountModalRef, ConnectWalletModalRef } from '@/modals/controls.js';

interface ConnectWalletProps {
    collapsed?: boolean;
}

export function ConnectWallet({ collapsed = false }: ConnectWalletProps) {
    const mounted = useMounted();
    const account = useAccount();

    const { data: ensName } = useEnsName({ address: account.address, chainId: mainnet.id });

    const text = resolve(() => {
        if (!account.isConnected || !account.address || !mounted) return t`Connect Wallet`;
        if (ensName) return formatDomainName(ensName);

        return formatEthereumAddress(account.address, 4);
    });

    return (
        <div
            className={classNames(
                'flex gap-x-3 overflow-hidden rounded-full p-2 text-xl/5 hover:cursor-pointer hover:bg-bg',
                {
                    'px-4 py-3': !collapsed,
                },
            )}
            onClick={() => {
                account.isConnected ? AccountModalRef.open() : ConnectWalletModalRef.open();
            }}
        >
            {collapsed ? (
                <Tooltip content={account.address} placement="right">
                    <WalletIcon className="flex-shrink-0" width={20} height={20} />
                </Tooltip>
            ) : (
                <WalletIcon className="flex-shrink-0" width={20} height={20} />
            )}
            <span
                className="overflow-hidden text-ellipsis"
                style={{ display: collapsed ? 'none' : 'inline' }}
                title={account.address}
            >
                {text}
            </span>
        </div>
    );
}
