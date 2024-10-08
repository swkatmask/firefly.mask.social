'use client';

import { usePathname, useSearchParams } from 'next/navigation.js';
import { startTransition, useEffect, useLayoutEffect, useMemo } from 'react';

import { PageRoute, SearchType, Source } from '@/constants/enum.js';
import { SORTED_BOOKMARK_SOURCES, SORTED_HOME_SOURCES, SORTED_SOCIAL_SOURCES } from '@/constants/index.js';
import { classNames } from '@/helpers/classNames.js';
import { getCurrentSourceFromUrl } from '@/helpers/getCurrentSourceFromUrl.js';
import { isRoutePathname } from '@/helpers/isRoutePathname.js';
import { resolveSourceInURL } from '@/helpers/resolveSourceInURL.js';
import { resolveSourceName } from '@/helpers/resolveSourceName.js';
import { useIsLogin } from '@/hooks/useIsLogin.js';
import { useUpdateParams } from '@/hooks/useUpdateParams.js';
import { useGlobalState } from '@/store/useGlobalStore.js';
import { useFireflyStateStore } from '@/store/useProfileStore.js';
import { useSearchStateStore } from '@/store/useSearchStore.js';

export function SourceTabs() {
    const currentSource = useGlobalState.use.currentSource();
    const updateCurrentSource = useGlobalState.use.updateCurrentSource();

    const { currentProfileSession: fireflySession } = useFireflyStateStore();
    const { updateSearchType } = useSearchStateStore();

    const searchParams = useSearchParams();
    const pathname = usePathname();
    const isTwitterLogin = useIsLogin(Source.Twitter);

    const sources = useMemo(() => {
        switch (pathname) {
            case PageRoute.Bookmarks:
                return SORTED_BOOKMARK_SOURCES;
            case PageRoute.Search:
                return SORTED_SOCIAL_SOURCES.filter((source) => {
                    if (source === Source.Twitter) return isTwitterLogin;
                    return true;
                });
            default:
                return SORTED_HOME_SOURCES.filter((x) => {
                    if (x !== Source.Article && x !== Source.NFTs) return true;
                    if (
                        pathname === PageRoute.Home ||
                        (pathname === PageRoute.Following && !!fireflySession) ||
                        isRoutePathname(pathname, '/post/:detail/photos/:index', true)
                    )
                        return true;
                    return false;
                });
        }
    }, [pathname, fireflySession, isTwitterLogin]);

    const shouldReset = !sources.includes(currentSource);

    useLayoutEffect(() => {
        if (shouldReset) updateCurrentSource(Source.Farcaster);
    }, [shouldReset, updateCurrentSource]);

    useEffect(() => {
        updateCurrentSource(getCurrentSourceFromUrl());
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [pathname]);

    const updateParams = useUpdateParams();

    if (searchParams.get('hiddenTabs')) return null;

    return (
        <div className="border-b border-line bg-primaryBottom px-4">
            <nav className="scrollable-tab -mb-px flex space-x-4" aria-label="Tabs">
                {sources.map((value) => (
                    <li key={value} className="flex flex-1 list-none justify-center lg:flex-initial lg:justify-start">
                        <a
                            className={classNames(
                                currentSource === value ? 'border-b-2 border-fireflyBrand text-main' : 'text-third',
                                'h-[43px] px-4 text-center text-xl font-bold leading-[43px] hover:cursor-pointer hover:text-main',
                                'md:h-[60px] md:py-[18px] md:leading-6',
                            )}
                            aria-current={currentSource === value ? 'page' : undefined}
                            onClick={() =>
                                startTransition(() => {
                                    scrollTo(0, 0);
                                    updateCurrentSource(value);
                                    const type = searchParams.get('type') as SearchType;

                                    if (type === SearchType.Channels && value === Source.Lens) {
                                        updateSearchType(SearchType.Posts);
                                        updateParams(
                                            new URLSearchParams({
                                                source: resolveSourceInURL(value),
                                                type: SearchType.Posts,
                                            }),
                                        );
                                    } else {
                                        updateParams(
                                            new URLSearchParams({
                                                source: resolveSourceInURL(value),
                                            }),
                                        );
                                    }
                                })
                            }
                        >
                            {resolveSourceName(value)}
                        </a>
                    </li>
                ))}
            </nav>
        </div>
    );
}
