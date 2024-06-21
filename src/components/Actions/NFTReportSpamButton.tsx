import { FlagIcon } from '@heroicons/react/24/outline';
import { Trans } from '@lingui/macro';
import { forwardRef } from 'react';

import { MenuButton } from '@/components/Actions/MenuButton.js';
import type { ClickableButtonProps } from '@/components/ClickableButton.js';
import { useReportSpamNFT } from '@/hooks/useReportSpamNFT.js';

interface Props extends Omit<ClickableButtonProps, 'children'> {
    collectionId: string;
}

export const NFTReportSpamButton = forwardRef<HTMLButtonElement, Props>(function ReportSpamButton(
    { collectionId, ...rest },
    ref,
) {
    const [, reportSpamNFT] = useReportSpamNFT();
    return (
        <MenuButton
            {...rest}
            ref={ref}
            onClick={async () => {
                rest.onClick?.();
                await reportSpamNFT(collectionId);
            }}
        >
            <FlagIcon width={24} height={24} />
            <span className="font-bold leading-[22px] text-main">
                <Trans>Report spam</Trans>
            </span>
        </MenuButton>
    );
});
