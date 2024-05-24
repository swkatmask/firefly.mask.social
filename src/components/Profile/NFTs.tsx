'use client';

import { t } from '@lingui/macro';
import { first } from 'lodash-es';
import { useMemo, useState } from 'react';

import UndoSVG from '@/assets/undo.svg';
import { ClickableButton } from '@/components/ClickableButton.js';
import { NFTList } from '@/components/CollectionDetail/NFTList.js';
import { Image } from '@/components/Image.js';
import { NFTCollectionList } from '@/components/Profile/NFTCollectionList.js';
import { Tooltip } from '@/components/Tooltip.js';
import { resolveSimpleHashChainId } from '@/helpers/resolveSimpleHashChainId.js';
import type { CollectionDetails } from '@/providers/types/Firefly.js';

export function NFTs(props: { address: string }) {
    const { address } = props;
    const [selectedCollection, setSelectedCollection] = useState<CollectionDetails | null>(null);

    const [selectedCollectionContractChainId, selectedCollectionContractAddress] = useMemo(() => {
        const firstTopContract = first(selectedCollection?.top_contracts);
        if (!firstTopContract) return [null, null];
        const [chain, address] = firstTopContract.split('.');
        return [resolveSimpleHashChainId(chain), address];
    }, [selectedCollection]);

    return (
        <div className="px-3 py-2">
            {selectedCollection && selectedCollectionContractAddress && selectedCollectionContractChainId ? (
                <>
                    <div className="mb-2 flex flex-row items-center">
                        <ClickableButton
                            className="mr-2 rounded-full bg-lightBg p-2"
                            onClick={() => setSelectedCollection(null)}
                        >
                            <Tooltip content={t`Back`}>
                                <UndoSVG className="h-4 w-4" />
                            </Tooltip>
                        </ClickableButton>
                        {selectedCollection.image_url ? (
                            <Image
                                className="mr-2 h-6 w-6 rounded-full object-cover"
                                src={selectedCollection.image_url ?? ''}
                                alt={selectedCollection.name}
                                width={24}
                                height={24}
                            />
                        ) : null}
                        <div className="max-w-[calc(100%-32px-24px-16px)] truncate text-base font-bold leading-5">
                            {selectedCollection.name}
                        </div>
                    </div>
                    <NFTList address={selectedCollectionContractAddress} chainId={selectedCollectionContractChainId} />
                </>
            ) : (
                <NFTCollectionList
                    address={address}
                    onClickCollection={(collection) => {
                        setSelectedCollection(collection.collection_details);
                    }}
                />
            )}
        </div>
    );
}
