/* cspell:disable */
export const MirrorABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_factory',
                internalType: 'address',
                type: 'address',
            },
            {
                name: '_treasuryConfiguration',
                internalType: 'address',
                type: 'address',
            },
            {
                name: '_o11y',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        type: 'error',
        inputs: [],
        name: 'InvalidCreator',
    },
    {
        type: 'error',
        inputs: [],
        name: 'InvalidCreatorAttributionSignature',
    },
    {
        type: 'error',
        inputs: [],
        name: 'InvalidShortString',
    },
    {
        type: 'error',
        inputs: [],
        name: 'NameAndVersionTooLong',
    },
    {
        type: 'error',
        inputs: [
            {
                name: 'str',
                internalType: 'string',
                type: 'string',
            },
        ],
        name: 'StringTooLong',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'approved',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true,
            },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'approved',
                internalType: 'bool',
                type: 'bool',
                indexed: false,
            },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldBaseDescriptionURI',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
            {
                name: 'newBaseDescriptionURI',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
        ],
        name: 'BaseDescriptionURISet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'CloneDeployed',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'structHash',
                internalType: 'bytes32',
                type: 'bytes32',
                indexed: false,
            },
            {
                name: 'domainName',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
            {
                name: 'version',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
            {
                name: 'creator',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'signature',
                internalType: 'bytes',
                type: 'bytes',
                indexed: false,
            },
        ],
        name: 'CreatorAttribution',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [],
        name: 'EIP712DomainChanged',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'guard',
                internalType: 'bool',
                type: 'bool',
                indexed: false,
            },
        ],
        name: 'FactoryGuardSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldImplementation',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newImplementation',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'FactoryImplementationSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'FactoryLimitSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldFundingRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newFundingRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'FundingRecipientSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'previousOwner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'OwnershipTransferred',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'PriceSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'price',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'PriceSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'renderer',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'RendererSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'renderer',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'RendererSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'creatorReward',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'fee',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'mintReferralReward',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'firstMinterReward',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'creator',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'mintReferral',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'firstMinter',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
        ],
        name: 'RewardsDistributed',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'RoyaltyChange',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'oldRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'RoyaltyChange',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'Transfer',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true,
            },
        ],
        name: 'Transfer',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldTributary',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'newTributary',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'TributarySet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'WritingEditionLimitSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'WritingEditionLimitSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'recipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'price',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
            {
                name: 'flatFeeAmount',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'WritingEditionPurchased',
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'TYPEHASH',
        outputs: [
            {
                name: '',
                internalType: 'bytes32',
                type: 'bytes32',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'VERSION',
        outputs: [
            {
                name: '',
                internalType: 'uint8',
                type: 'uint8',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'baseDescriptionURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'cancelOwnershipTransfer',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'contentURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'contractURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'description',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'eip712Domain',
        outputs: [
            {
                name: 'fields',
                internalType: 'bytes1',
                type: 'bytes1',
            },
            {
                name: 'name',
                internalType: 'string',
                type: 'string',
            },
            {
                name: 'version',
                internalType: 'string',
                type: 'string',
            },
            {
                name: 'chainId',
                internalType: 'uint256',
                type: 'uint256',
            },
            {
                name: 'verifyingContract',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'salt',
                internalType: 'bytes32',
                type: 'bytes32',
            },
            {
                name: 'extensions',
                internalType: 'uint256[]',
                type: 'uint256[]',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'factory',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'firstMinter',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'fundingRecipient',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'getApproved',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'guardOn',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'imageURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            {
                name: '_creator',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'edition',
                internalType: 'struct IWritingEditions.WritingEdition',
                type: 'tuple',
                components: [
                    {
                        name: 'name',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'symbol',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'description',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'imageURI',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'contentURI',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'price',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                    {
                        name: 'limit',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                    {
                        name: 'fundingRecipient',
                        internalType: 'address',
                        type: 'address',
                    },
                    {
                        name: 'renderer',
                        internalType: 'address',
                        type: 'address',
                    },
                    {
                        name: 'nonce',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
            },
            {
                name: 'mintReferral',
                internalType: 'address',
                type: 'address',
            },
            {
                name: '_guardOn',
                internalType: 'bool',
                type: 'bool',
            },
        ],
        name: 'initialize',
        outputs: [],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            {
                name: '_creator',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'structHash',
                internalType: 'bytes32',
                type: 'bytes32',
            },
            {
                name: 'signature',
                internalType: 'bytes',
                type: 'bytes',
            },
            {
                name: 'edition',
                internalType: 'struct IWritingEditions.WritingEdition',
                type: 'tuple',
                components: [
                    {
                        name: 'name',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'symbol',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'description',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'imageURI',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'contentURI',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'price',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                    {
                        name: 'limit',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                    {
                        name: 'fundingRecipient',
                        internalType: 'address',
                        type: 'address',
                    },
                    {
                        name: 'renderer',
                        internalType: 'address',
                        type: 'address',
                    },
                    {
                        name: 'nonce',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                ],
            },
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
            },
            {
                name: 'mintReferral',
                internalType: 'address',
                type: 'address',
            },
            {
                name: '_guardOn',
                internalType: 'bool',
                type: 'bool',
            },
            {
                name: 'sender',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'initializeWithSignature',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'isApprovedForAll',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'isNextOwner',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'isOwner',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'limit',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'mint',
        outputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'o11y',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenIds',
                internalType: 'uint256[]',
                type: 'uint256[]',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                name: 'owners',
                internalType: 'address[]',
                type: 'address[]',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'packedDomainNameAndVersion',
        outputs: [
            {
                name: '',
                internalType: 'bytes32',
                type: 'bytes32',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'price',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
            },
            {
                name: 'mintReferral',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'purchase',
        outputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'renderer',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'royaltyBPS',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: '_tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
            {
                name: '_salePrice',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'royaltyInfo',
        outputs: [
            {
                name: 'receiver',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'royaltyAmount',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'royaltyRecipient',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
            {
                name: '_data',
                internalType: 'bytes',
                type: 'bytes',
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'approved',
                internalType: 'bool',
                type: 'bool',
            },
        ],
        name: 'setApprovalForAll',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'newBaseDescriptionURI',
                internalType: 'string',
                type: 'string',
            },
        ],
        name: 'setBaseDescriptionURI',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: '_fundingRecipient',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'setFundingRecipient',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'setLimit',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'setMaxLimit',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: '_price',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'setPrice',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: '_renderer',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'setRenderer',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'royaltyRecipient_',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'royaltyBPS_',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'setRoyaltyInfo',
        outputs: [],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [
            {
                name: 'interfaceId',
                internalType: 'bytes4',
                type: 'bytes4',
            },
        ],
        name: 'supportsInterface',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'toggleGuard',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'tokenURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'nextOwner_',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'treasuryConfiguration',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
];

export const OldMirrorABI = [
    {
        stateMutability: 'nonpayable',
        type: 'constructor',
        inputs: [
            {
                name: '_factory',
                internalType: 'address',
                type: 'address',
            },
            {
                name: '_treasuryConfiguration',
                internalType: 'address',
                type: 'address',
            },
            {
                name: '_o11y',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'approved',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true,
            },
        ],
        name: 'Approval',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'approved',
                internalType: 'bool',
                type: 'bool',
                indexed: false,
            },
        ],
        name: 'ApprovalForAll',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldBaseDescriptionURI',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
            {
                name: 'newBaseDescriptionURI',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
        ],
        name: 'BaseDescriptionURISet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'CloneDeployed',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'guard',
                internalType: 'bool',
                type: 'bool',
                indexed: false,
            },
        ],
        name: 'FactoryGuardSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldImplementation',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newImplementation',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'FactoryImplementationSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'FactoryLimitSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldFundingRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newFundingRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'FundingRecipientSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'previousOwner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newOwner',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'OwnershipTransferred',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'PriceSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'price',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'PriceSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'renderer',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'RendererSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'renderer',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'RendererSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'RoyaltyChange',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'oldRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newRoyaltyRecipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'newRoyaltyBPS',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'RoyaltyChange',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'Transfer',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: true,
            },
        ],
        name: 'Transfer',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'factory',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldTributary',
                internalType: 'address',
                type: 'address',
                indexed: false,
            },
            {
                name: 'newTributary',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
        ],
        name: 'TributarySet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'WritingEditionLimitSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'oldLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
        ],
        name: 'WritingEditionLimitSet',
    },
    {
        type: 'event',
        anonymous: false,
        inputs: [
            {
                name: 'clone',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'recipient',
                internalType: 'address',
                type: 'address',
                indexed: true,
            },
            {
                name: 'price',
                internalType: 'uint256',
                type: 'uint256',
                indexed: false,
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
                indexed: false,
            },
        ],
        name: 'WritingEditionPurchased',
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'VERSION',
        outputs: [
            {
                name: '',
                internalType: 'uint8',
                type: 'uint8',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'acceptOwnership',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'approve',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'balanceOf',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'baseDescriptionURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'cancelOwnershipTransfer',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'contentURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'contractURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'description',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'factory',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'fee',
        outputs: [
            {
                name: '',
                internalType: 'uint16',
                type: 'uint16',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'fundingRecipient',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'getApproved',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'guardOn',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'imageURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            {
                name: '_owner',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'edition',
                internalType: 'struct IWritingEditions.WritingEdition',
                type: 'tuple',
                components: [
                    {
                        name: 'name',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'symbol',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'description',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'imageURI',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'contentURI',
                        internalType: 'string',
                        type: 'string',
                    },
                    {
                        name: 'price',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                    {
                        name: 'limit',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                    {
                        name: 'fundingRecipient',
                        internalType: 'address',
                        type: 'address',
                    },
                    {
                        name: 'renderer',
                        internalType: 'address',
                        type: 'address',
                    },
                    {
                        name: 'nonce',
                        internalType: 'uint256',
                        type: 'uint256',
                    },
                    {
                        name: 'fee',
                        internalType: 'uint16',
                        type: 'uint16',
                    },
                ],
            },
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
            },
            {
                name: '_guardOn',
                internalType: 'bool',
                type: 'bool',
            },
        ],
        name: 'initialize',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'owner',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'isApprovedForAll',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'isNextOwner',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'isOwner',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'limit',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'mint',
        outputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'name',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'o11y',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'owner',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenIds',
                internalType: 'uint256[]',
                type: 'uint256[]',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                name: 'owners',
                internalType: 'address[]',
                type: 'address[]',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'ownerOf',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'price',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
            },
        ],
        name: 'purchase',
        outputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'payable',
        type: 'function',
        inputs: [
            {
                name: 'tokenRecipient',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'message',
                internalType: 'string',
                type: 'string',
            },
        ],
        name: 'purchaseThroughFactory',
        outputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'renderer',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'renounceOwnership',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'royaltyBPS',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: '_tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
            {
                name: '_salePrice',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'royaltyInfo',
        outputs: [
            {
                name: 'receiver',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'royaltyAmount',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'royaltyRecipient',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
            {
                name: '_data',
                internalType: 'bytes',
                type: 'bytes',
            },
        ],
        name: 'safeTransferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'operator',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'approved',
                internalType: 'bool',
                type: 'bool',
            },
        ],
        name: 'setApprovalForAll',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'newBaseDescriptionURI',
                internalType: 'string',
                type: 'string',
            },
        ],
        name: 'setBaseDescriptionURI',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: '_fundingRecipient',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'setFundingRecipient',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'newLimit',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'setLimit',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'setMaxLimit',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: '_price',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'setPrice',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: '_renderer',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'setRenderer',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'royaltyRecipient_',
                internalType: 'address payable',
                type: 'address',
            },
            {
                name: 'royaltyBPS_',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'setRoyaltyInfo',
        outputs: [],
    },
    {
        stateMutability: 'pure',
        type: 'function',
        inputs: [
            {
                name: 'interfaceId',
                internalType: 'bytes4',
                type: 'bytes4',
            },
        ],
        name: 'supportsInterface',
        outputs: [
            {
                name: '',
                internalType: 'bool',
                type: 'bool',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'symbol',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [],
        name: 'toggleGuard',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'tokenURI',
        outputs: [
            {
                name: '',
                internalType: 'string',
                type: 'string',
            },
        ],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'totalSupply',
        outputs: [
            {
                name: '',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'from',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'to',
                internalType: 'address',
                type: 'address',
            },
            {
                name: 'tokenId',
                internalType: 'uint256',
                type: 'uint256',
            },
        ],
        name: 'transferFrom',
        outputs: [],
    },
    {
        stateMutability: 'nonpayable',
        type: 'function',
        inputs: [
            {
                name: 'nextOwner_',
                internalType: 'address',
                type: 'address',
            },
        ],
        name: 'transferOwnership',
        outputs: [],
    },
    {
        stateMutability: 'view',
        type: 'function',
        inputs: [],
        name: 'treasuryConfiguration',
        outputs: [
            {
                name: '',
                internalType: 'address',
                type: 'address',
            },
        ],
    },
];

export const MirrorFactoryABI = [
    {
        inputs: [
            { internalType: 'address', name: '_owner', type: 'address' },
            { internalType: 'address', name: '_treasuryConfiguration', type: 'address' },
            { internalType: 'address', name: '_o11y', type: 'address' },
            { internalType: 'uint256', name: '_maxLimit', type: 'uint256' },
            { internalType: 'bool', name: '_guardOn', type: 'bool' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: false, internalType: 'string', name: 'oldBaseDescriptionURI', type: 'string' },
            { indexed: false, internalType: 'string', name: 'newBaseDescriptionURI', type: 'string' },
        ],
        name: 'BaseDescriptionURISet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'factory', type: 'address' },
            { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
        ],
        name: 'CloneDeployed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'owner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: true, internalType: 'address', name: 'implementation', type: 'address' },
        ],
        name: 'EditionsDeployed',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [{ indexed: false, internalType: 'bool', name: 'guard', type: 'bool' }],
        name: 'FactoryGuardSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'factory', type: 'address' },
            { indexed: true, internalType: 'address', name: 'oldImplementation', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newImplementation', type: 'address' },
        ],
        name: 'FactoryImplementationSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'factory', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'oldLimit', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'newLimit', type: 'uint256' },
        ],
        name: 'FactoryLimitSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: true, internalType: 'address', name: 'oldFundingRecipient', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newFundingRecipient', type: 'address' },
        ],
        name: 'FundingRecipientSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'oldImplementation', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newImplementation', type: 'address' },
        ],
        name: 'NewImplementation',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'previousOwner', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newOwner', type: 'address' },
        ],
        name: 'OwnershipTransferred',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'oldLimit', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'newLimit', type: 'uint256' },
        ],
        name: 'PriceSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: true, internalType: 'address', name: 'renderer', type: 'address' },
        ],
        name: 'RendererSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: true, internalType: 'address', name: 'oldRoyaltyRecipient', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'oldRoyaltyBPS', type: 'uint256' },
            { indexed: true, internalType: 'address', name: 'newRoyaltyRecipient', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'newRoyaltyBPS', type: 'uint256' },
        ],
        name: 'RoyaltyChange',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: true, internalType: 'address', name: 'from', type: 'address' },
            { indexed: true, internalType: 'address', name: 'to', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
        ],
        name: 'Transfer',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'factory', type: 'address' },
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: false, internalType: 'address', name: 'oldTributary', type: 'address' },
            { indexed: true, internalType: 'address', name: 'newTributary', type: 'address' },
        ],
        name: 'TributarySet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'oldLimit', type: 'uint256' },
            { indexed: false, internalType: 'uint256', name: 'newLimit', type: 'uint256' },
        ],
        name: 'WritingEditionLimitSet',
        type: 'event',
    },
    {
        anonymous: false,
        inputs: [
            { indexed: true, internalType: 'address', name: 'clone', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'tokenId', type: 'uint256' },
            { indexed: true, internalType: 'address', name: 'recipient', type: 'address' },
            { indexed: false, internalType: 'uint256', name: 'price', type: 'uint256' },
            { indexed: false, internalType: 'string', name: 'message', type: 'string' },
            { indexed: false, internalType: 'uint256', name: 'flatFeeAmount', type: 'uint256' },
        ],
        name: 'WritingEditionPurchased',
        type: 'event',
    },
    {
        inputs: [],
        name: 'VERSION',
        outputs: [{ internalType: 'uint8', name: '', type: 'uint8' }],
        stateMutability: 'view',
        type: 'function',
    },
    { inputs: [], name: 'acceptOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [],
        name: 'baseDescriptionURI',
        outputs: [{ internalType: 'string', name: '', type: 'string' }],
        stateMutability: 'view',
        type: 'function',
    },
    { inputs: [], name: 'cancelOwnershipTransfer', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [
            {
                components: [
                    { internalType: 'string', name: 'name', type: 'string' },
                    { internalType: 'string', name: 'symbol', type: 'string' },
                    { internalType: 'string', name: 'description', type: 'string' },
                    { internalType: 'string', name: 'imageURI', type: 'string' },
                    { internalType: 'string', name: 'contentURI', type: 'string' },
                    { internalType: 'uint256', name: 'price', type: 'uint256' },
                    { internalType: 'uint256', name: 'limit', type: 'uint256' },
                    { internalType: 'address', name: 'fundingRecipient', type: 'address' },
                    { internalType: 'address', name: 'renderer', type: 'address' },
                    { internalType: 'uint256', name: 'nonce', type: 'uint256' },
                ],
                internalType: 'struct IWritingEditions.WritingEdition',
                name: 'edition',
                type: 'tuple',
            },
        ],
        name: 'create',
        outputs: [{ internalType: 'address', name: 'clone', type: 'address' }],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'owner', type: 'address' },
            {
                components: [
                    { internalType: 'string', name: 'name', type: 'string' },
                    { internalType: 'string', name: 'symbol', type: 'string' },
                    { internalType: 'string', name: 'description', type: 'string' },
                    { internalType: 'string', name: 'imageURI', type: 'string' },
                    { internalType: 'string', name: 'contentURI', type: 'string' },
                    { internalType: 'uint256', name: 'price', type: 'uint256' },
                    { internalType: 'uint256', name: 'limit', type: 'uint256' },
                    { internalType: 'address', name: 'fundingRecipient', type: 'address' },
                    { internalType: 'address', name: 'renderer', type: 'address' },
                    { internalType: 'uint256', name: 'nonce', type: 'uint256' },
                ],
                internalType: 'struct IWritingEditions.WritingEdition',
                name: 'edition',
                type: 'tuple',
            },
            { internalType: 'uint8', name: 'v', type: 'uint8' },
            { internalType: 'bytes32', name: 'r', type: 'bytes32' },
            { internalType: 'bytes32', name: 's', type: 'bytes32' },
            { internalType: 'address', name: 'tokenRecipient', type: 'address' },
            { internalType: 'string', name: 'message', type: 'string' },
            { internalType: 'address', name: 'mintReferral', type: 'address' },
        ],
        name: 'createWithSignature',
        outputs: [{ internalType: 'address', name: 'clone', type: 'address' }],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'guardOn',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'implementation',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'isNextOwner',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'isOwner',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'maxLimit',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'o11y',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'owner',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: '_implementation', type: 'address' },
            { internalType: 'bytes32', name: 'salt', type: 'bytes32' },
        ],
        name: 'predictDeterministicAddress',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
    { inputs: [], name: 'renounceOwnership', outputs: [], stateMutability: 'nonpayable', type: 'function' },
    {
        inputs: [{ internalType: 'bytes32', name: '', type: 'bytes32' }],
        name: 'salts',
        outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'bool', name: '_guardOn', type: 'bool' }],
        name: 'setGuard',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: '_implementation', type: 'address' }],
        name: 'setImplementation',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: '_maxLimit', type: 'uint256' }],
        name: 'setLimit',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'address', name: 'clone', type: 'address' },
            { internalType: 'address', name: '_tributary', type: 'address' },
        ],
        name: 'setTributary',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'address', name: 'nextOwner_', type: 'address' }],
        name: 'transferOwnership',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [],
        name: 'treasuryConfiguration',
        outputs: [{ internalType: 'address', name: '', type: 'address' }],
        stateMutability: 'view',
        type: 'function',
    },
];
