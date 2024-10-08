import { usePathname } from 'next/navigation.js';
import { useMemo } from 'react';

import { NotLoginFallback } from '@/components/NotLoginFallback.js';
import { Info } from '@/components/Profile/Info.js';
import { ProfileContentTabs } from '@/components/Profile/ProfileContentTabs.js';
import { ProfileTabs } from '@/components/Profile/ProfileTabs.js';
import { WalletInfo } from '@/components/Profile/WalletInfo.js';
import { WalletTabs } from '@/components/Profile/WalletTabs.js';
import { SuspendedAccountFallback } from '@/components/SuspendedAccountFallback.js';
import { SuspendedAccountInfo } from '@/components/SuspendedAccountInfo.js';
import { PageRoute, type SocialSource, Source } from '@/constants/enum.js';
import { narrowToSocialSource } from '@/helpers/narrowToSocialSource.js';
import { resolveFireflyProfiles } from '@/helpers/resolveFireflyProfiles.js';
import type { FireflyProfile, Relation } from '@/providers/types/Firefly.js';
import type { Profile } from '@/providers/types/SocialMedia.js';
import { useFireflyIdentityState } from '@/store/useFireflyIdentityStore.js';
import { useTwitterStateStore } from '@/store/useProfileStore.js';

interface ProfileContentProps {
    profile?: Profile | null;
    profiles: FireflyProfile[];
    relations?: Relation[];
    isSuspended?: boolean;
}

export function ProfileContent({ profile, profiles, relations, isSuspended }: ProfileContentProps) {
    const { identity } = useFireflyIdentityState();
    const currentTwitterProfile = useTwitterStateStore.use.currentProfile();

    const pathname = usePathname();
    const isProfilePage = pathname === PageRoute.Profile;

    const { source } = identity;
    const { walletProfile } = resolveFireflyProfiles(identity, profiles);

    const info = useMemo(() => {
        if (source === Source.Wallet && walletProfile) {
            return <WalletInfo profile={walletProfile} relations={relations} />;
        }
        if (profile) {
            return <Info profile={profile} />;
        }
        if (isSuspended) {
            return <SuspendedAccountInfo source={source as SocialSource} />;
        }
        return null;
    }, [profile, walletProfile, relations, isSuspended, source]);

    const content = useMemo(() => {
        if (isSuspended) {
            return <SuspendedAccountFallback />;
        }
        if (walletProfile) {
            return <WalletTabs address={walletProfile.address} />;
        }
        if (profile) {
            return <ProfileContentTabs source={profile.source} profileId={profile.profileId} />;
        }
        return null;
    }, [isSuspended, walletProfile, profile]);

    if (source === Source.Twitter && !currentTwitterProfile?.profileId) {
        return <NotLoginFallback source={Source.Twitter} />;
    }

    if (isProfilePage && !profile && source !== Source.Wallet) {
        return <NotLoginFallback source={narrowToSocialSource(source)} />;
    }

    return (
        <>
            {info}
            <ProfileTabs profiles={profiles.filter((x) => x.identity.source === source)} />
            {content}
        </>
    );
}
