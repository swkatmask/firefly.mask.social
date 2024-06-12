'use client';

import { t, Trans } from '@lingui/macro';

import { Headline } from '@/app/(settings)/components/Headline.js';
import { Section } from '@/app/(settings)/components/Section.js';
import { CircleCheckboxIcon } from '@/components/CircleCheckboxIcon.js';
import { ClickableArea } from '@/components/ClickableArea.js';
import { useDeveloperSettings } from '@/store/useDeveloperSettings.js';

export default function Settings() {
    const { useDevelopmentAPI, updateUseDevelopmentAPI } = useDeveloperSettings();

    return (
        <Section>
            <Headline>
                <Trans>General</Trans>
            </Headline>

            {
                <ul className="w-full">
                    {[
                        {
                            title: useDevelopmentAPI
                                ? 'Enable production API version'
                                : 'Enable development API version',
                            description: useDevelopmentAPI
                                ? t`Switch to the production API version for using stable features.`
                                : t`Switch to the development API version for testing new features.`,
                        },
                    ].map((x, i) => {
                        return (
                            <ClickableArea
                                as="li"
                                className="mb-6 flex cursor-pointer items-center justify-between border-b border-line pb-1 text-[18px] leading-[24px] text-main"
                                key={i}
                                onClick={() => {
                                    updateUseDevelopmentAPI(!useDevelopmentAPI);
                                }}
                            >
                                <div className="flex-1">
                                    <h2 className="mb-2">{x.title}</h2>
                                    <p className="text-sm text-secondary">{x.description}</p>
                                </div>
                                <div>
                                    <CircleCheckboxIcon checked={useDevelopmentAPI} />
                                </div>
                            </ClickableArea>
                        );
                    })}
                </ul>
            }
        </Section>
    );
}
