import { t } from '@lingui/macro';
import { memo, useMemo } from 'react';
import { useAccount } from 'wagmi';

import { SendWithEVM, SendWithSolana } from '@/components/Tips/SendTipsButton.js';
import { TipsModalHeader } from '@/components/Tips/TipsModalHeader.js';
import { TokenSelectorEntry } from '@/components/Tips/TokenSelector.js';
import { WalletSelectorEntry } from '@/components/Tips/WalletSelector.js';
import { NetworkType } from '@/constants/enum.js';
import { TipsContext } from '@/hooks/useTipsContext.js';

export const TipsUI = memo(function TipsUI() {
    const account = useAccount();
    const { token, receiver, amount, handle, isSending, update } = TipsContext.useContainer();

    const { RE_MATCH_WHOLE_AMOUNT, RE_MATCH_FRACTION_AMOUNT } = useMemo(
        () => ({
            RE_MATCH_FRACTION_AMOUNT: new RegExp(`^\\.\\d{0,${token?.decimals}}$`),
            RE_MATCH_WHOLE_AMOUNT: new RegExp(`^\\d*\\.?\\d{0,${token?.decimals}}$`),
        }),
        [token?.decimals],
    );

    const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const amount_ = e.currentTarget.value.replaceAll(',', '.');
        if (RE_MATCH_FRACTION_AMOUNT.test(amount_)) {
            update((prev) => ({ ...prev, amount: `0${amount_}` }));
        } else if (amount_ === '' || RE_MATCH_WHOLE_AMOUNT.test(amount_)) {
            update((prev) => ({ ...prev, amount: amount_ }));
        }
    };

    return (
        <>
            <TipsModalHeader title={receiver ? t`Tip to @${handle || receiver.displayName}` : undefined} />
            <div className="font-bold">
                <WalletSelectorEntry disabled={!account.isConnected || isSending} />
                <div className="mt-3 flex gap-x-3">
                    <div className="h-10 flex-1 rounded-2xl bg-lightBg">
                        <input
                            className="h-full w-full border-none bg-transparent text-center outline-none focus:outline-none focus:ring-0 disabled:cursor-not-allowed disabled:opacity-50"
                            placeholder={token ? t`Max: ${token.balance}` : t`Please select token.`}
                            value={amount}
                            autoComplete="off"
                            spellCheck="false"
                            onChange={handleAmountChange}
                            disabled={!account.isConnected || !token || isSending}
                        />
                    </div>
                    <TokenSelectorEntry disabled={!account.isConnected || isSending} />
                </div>
                {receiver ? receiver.networkType === NetworkType.Ethereum ? <SendWithEVM /> : <SendWithSolana /> : null}
            </div>
        </>
    );
});
