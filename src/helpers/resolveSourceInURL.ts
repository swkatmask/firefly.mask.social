import { createLookupTableResolver } from '@masknet/shared-base';

import { type SocialSource, type SocialSourceInURL, Source, SourceInURL } from '@/constants/enum.js';

export const resolveSourceInURL = createLookupTableResolver<Source, SourceInURL>(
    {
        [Source.Farcaster]: SourceInURL.Farcaster,
        [Source.Lens]: SourceInURL.Lens,
        [Source.Twitter]: SourceInURL.Twitter,
        [Source.Firefly]: SourceInURL.Firefly,
        [Source.Article]: SourceInURL.Article,
        [Source.Wallet]: SourceInURL.Wallet,
        [Source.NFTs]: SourceInURL.NFTs,
    },
    (keyword) => {
        throw new Error(`Unknown keyword: ${keyword}`);
    },
);

export const resolveSocialSourceInURL = createLookupTableResolver<SocialSource, SocialSourceInURL>(
    {
        [Source.Farcaster]: SourceInURL.Farcaster,
        [Source.Lens]: SourceInURL.Lens,
        [Source.Twitter]: SourceInURL.Twitter,
    },
    (keyword) => {
        throw new Error(`Unknown keyword: ${keyword}`);
    },
);
