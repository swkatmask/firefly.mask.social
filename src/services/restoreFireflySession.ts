import { safeUnreachable } from '@masknet/kit';
import urlcat from 'urlcat';

import { Source } from '@/constants/enum.js';
import { FIREFLY_ROOT_URL, SORTED_SOCIAL_SOURCES } from '@/constants/index.js';
import { fetchJSON } from '@/helpers/fetchJSON.js';
import { resolveFireflyResponseData } from '@/helpers/resolveFireflyResponseData.js';
import { resolveSessionHolder } from '@/helpers/resolveSessionHolder.js';
import { FarcasterSession } from '@/providers/farcaster/Session.js';
import { FireflySession } from '@/providers/firefly/Session.js';
import type { FarcasterLoginResponse, LensLoginResponse } from '@/providers/types/Firefly.js';
import type { Session } from '@/providers/types/Session.js';
import { SessionType } from '@/providers/types/SocialMedia.js';

/**
 * Restore firefly session from a lens or farcaster session.
 * @param session
 * @param signal
 * @returns
 */
export async function restoreFireflySession(session: Session, signal?: AbortSignal) {
    const type = session.type;

    switch (type) {
        case SessionType.Lens: {
            const url = urlcat(FIREFLY_ROOT_URL, '/v3/auth/lens/login');
            const response = await fetchJSON<LensLoginResponse>(url, {
                method: 'POST',
                body: JSON.stringify({
                    accessToken: session.token,
                }),
                signal,
            });
            const data = resolveFireflyResponseData(response);
            return new FireflySession(data.accountId, data.accessToken, session);
        }
        case SessionType.Farcaster: {
            if (FarcasterSession.isCustodyWallet(session)) throw new Error('Not allowed');

            const isGrantByPermission = FarcasterSession.isGrantByPermission(session);
            const isRelayService = FarcasterSession.isRelayService(session);

            const url = urlcat(FIREFLY_ROOT_URL, '/v3/auth/farcaster/login');
            const response = await fetchJSON<FarcasterLoginResponse>(url, {
                method: 'POST',
                body: JSON.stringify({
                    channelToken: isRelayService ? session.channelToken : undefined,
                    token: isGrantByPermission ? session.signerRequestToken : undefined,
                }),
                signal,
            });
            const data = resolveFireflyResponseData(response);

            if (data.fid && data.accountId && data.accessToken) {
                session.profileId = `${data.fid}`;
                return new FireflySession(data.accountId, data.accessToken, session);
            }
            return null;
        }
        case SessionType.Twitter:
            throw new Error('Not implemented');
        case SessionType.Firefly:
            throw new Error('Not allowed');
        default:
            safeUnreachable(type);
            return null;
    }
}

/**
 * Restore firefly session from all social sources.
 * @returns
 */
export async function resolveFireflySessionAll() {
    for (const source of SORTED_SOCIAL_SOURCES) {
        // we don't support twitter for now
        if (source === Source.Twitter) continue;

        const holder = resolveSessionHolder(source);
        if (!holder?.session) continue;

        const fireflySession = await restoreFireflySession(holder.session);
        if (!fireflySession) continue;

        return fireflySession;
    }
    return null;
}
