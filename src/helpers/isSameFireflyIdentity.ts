import { Source } from '@/constants/enum.js';
import { isSameAddress, isSameSolanaAddress } from '@/helpers/isSameAddress.js';
import type { FireflyIdentity } from '@/providers/types/Firefly.js';

export function isSameFireflyIdentity(identity?: FireflyIdentity, otherIdentity?: FireflyIdentity) {
    if (!identity || !otherIdentity) return false;

    if (identity.source === Source.Wallet || otherIdentity.source === Source.Wallet) {
        return isSameAddress(identity.id, otherIdentity.id) || isSameSolanaAddress(identity.id, otherIdentity.id);
    }

    return identity.source === otherIdentity.source && identity.id === otherIdentity.id;
}
