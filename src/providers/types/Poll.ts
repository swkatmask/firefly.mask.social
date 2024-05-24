import type { Pageable } from '@masknet/shared-base';

export interface PollOption {
    id: string;
    position?: number;
    label: string;
    votes?: number;
}

export interface Poll {
    id: string;
    options: PollOption[];
    validInDays: number;
    endDatetime?: string;
    votingStatus?: string;
}

export interface Provider {
    /**
     * Creates a new poll
     * @param poll
     * @param text Optional text to associate with the poll
     * @returns
     */
    createPoll: (poll: Poll, text?: string) => Promise<Poll>;

    /**
     * Retrieves a poll by its id
     * @param pollId
     * @returns
     */
    getPollById: (pollId: string) => Promise<Poll>;

    /**
     * Votes for an option in a poll
     * @param pollId
     * @param option
     * @returns
     */
    vote: (pollId: string, option: PollOption) => Promise<void>;

    /**
     * Deletes a poll by its id
     */
    deletePoll?: (pollId: string) => Promise<void>;

    /**
     * Retrieves all polls
     * @returns
     */
    getPollsByProfileId?: (profileId: string) => Promise<Pageable<Poll>>;
}
