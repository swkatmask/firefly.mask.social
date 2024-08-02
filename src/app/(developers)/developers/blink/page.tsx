'use client';

import { ArrowPathRoundedSquareIcon } from '@heroicons/react/24/outline';
import { t, Trans } from '@lingui/macro';
import { useMemo, useState } from 'react';
import { useAsyncFn } from 'react-use';
import urlcat from 'urlcat';

import { Headline } from '@/app/(settings)/components/Headline.js';
import { Section } from '@/app/(settings)/components/Section.js';
import { Blink } from '@/components/Blink/index.js';
import { ClickableButton } from '@/components/ClickableButton.js';
import { Source } from '@/constants/enum.js';
import { Link } from '@/esm/Link.js';
import { classNames } from '@/helpers/classNames.js';
import { createDummyPost } from '@/helpers/createDummyPost.js';
import { fetchJSON } from '@/helpers/fetchJSON.js';
import { resolveBlinkTCO } from '@/helpers/resolveBlinkTCO.js';
import { BlinkParser } from '@/providers/blink/Parser.js';

export default function BlinkPage() {
    const [url, setUrl] = useState('');
    const post = useMemo(() => createDummyPost(Source.Farcaster, url), [url]);

    const [{ error, loading }, onSubmit] = useAsyncFn(async () => {
        const [scheme] = url ? BlinkParser.extractSchemes(url) : [];
        if (!scheme) throw new Error('Invalid Blink URL.');

        await fetchJSON(urlcat('/api/solana/action', await resolveBlinkTCO(scheme)), {
            method: 'DELETE',
        });
    }, [url]);

    return (
        <Section>
            <Headline>
                <Trans>Blink</Trans>
            </Headline>

            <div className="mb-2 w-full">
                <Trans>
                    Please input the blink url to be revalidated.{' '}
                    <Link
                        href="https://docs.dialect.to/documentation/actions/actions/url-scheme"
                        className="text-farcasterPrimary underline"
                        target="_blank"
                    >
                        URL Scheme
                    </Link>
                </Trans>
            </div>

            <div className="mb-2 flex w-full flex-row gap-2">
                <input
                    className="flex-1 rounded-md border border-line bg-transparent"
                    type="text"
                    autoComplete="off"
                    spellCheck="false"
                    placeholder={t`Your Blink URL.`}
                    onChange={(e) => setUrl(e.target.value)}
                />
                <ClickableButton
                    className={classNames(
                        'flex h-[42px] w-[42px] items-center justify-center rounded-md border border-line',
                        {
                            'text-primaryMain': loading,
                            'hover:cursor-pointer': !loading,
                            'hover:text-secondary': !loading,
                        },
                    )}
                    disabled={loading || !url}
                    onClick={onSubmit}
                >
                    <ArrowPathRoundedSquareIcon width={24} height={24} />
                </ClickableButton>
            </div>

            <div className="w-full max-w-[500px]">
                <Blink post={post} />
            </div>
            {error ? <div className="w-full">{error.message}</div> : null}
        </Section>
    );
}
