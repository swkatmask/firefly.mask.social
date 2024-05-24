import type { Pageable, PageIndicator } from '@masknet/shared-base';
import { SimpleHashEVM } from '@masknet/web3-providers';
import type { BaseHubOptions, SimpleHash } from '@masknet/web3-providers/types';
import type { NonFungibleAsset } from '@masknet/web3-shared-base';
import type { ChainId, SchemaType } from '@masknet/web3-shared-evm';

import type { Provider } from '@/providers/types/WalletProfile.js';

class SimpleHashWalletProfile implements Provider {
    async getNFT(
        address: string,
        tokenId: string,
        options?: BaseHubOptions<ChainId>,
    ): Promise<NonFungibleAsset<ChainId, SchemaType> | null> {
        const asset = await SimpleHashEVM.getAsset(address, tokenId, options);
        return asset || null;
    }

    getNFTs(contractAddress: string, options?: BaseHubOptions<ChainId>) {
        return SimpleHashEVM.getAssetsByCollection(contractAddress, options);
    }

    getPOAPs(address: string, options?: BaseHubOptions<ChainId> & { contractAddress?: string }) {
        return SimpleHashEVM.getAssets(address, options);
    }

    async getCollection(
        contractAddress: string,
        options?: BaseHubOptions<ChainId>,
    ): Promise<SimpleHash.Collection | null> {
        const collection = await SimpleHashEVM.getCollectionByContractAddress(contractAddress, options);
        return collection || null;
    }

    async getTopCollectors(contractAddress: string, options?: BaseHubOptions<ChainId>) {
        const response = await SimpleHashEVM.getTopCollectorsByContract(contractAddress, options);
        return response as Pageable<SimpleHash.TopCollector, PageIndicator>;
    }
}

export const SimpleHashWalletProfileProvider = new SimpleHashWalletProfile();
