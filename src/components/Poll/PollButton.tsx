import { t } from '@lingui/macro';
import { memo } from 'react';

import PollIcon from '@/assets/poll.svg';
import { ClickableButton } from '@/components/ClickableButton.js';
import { Tooltip } from '@/components/Tooltip.js';
import { useCompositePost } from '@/hooks/useCompositePost.js';
import { useComposeStateStore } from '@/store/useComposeStore.js';

export const PollButton = memo(function PollButton() {
    const { video, images, poll } = useCompositePost();
    const { createPoll } = useComposeStateStore();

    const pollDisabled = !!video || images.length > 0 || !!poll;

    return (
        <Tooltip content={t`Poll`} placement="top" disabled={pollDisabled} className="leading-4">
            <ClickableButton disabled={pollDisabled} className="text-main" onClick={createPoll}>
                <PollIcon width={24} height={24} />
            </ClickableButton>
        </Tooltip>
    );
});
