import { isGreaterThan, isLessThan, rightShift } from '@masknet/web3-shared-base';
import type { ChainId } from '@masknet/web3-shared-evm';
import { estimateGas, getBalance, sendTransaction, waitForTransactionReceipt, writeContract } from '@wagmi/core';
import { type Address, erc20Abi, type Hash, parseUnits } from 'viem';

import { config } from '@/configs/wagmiClient.js';
import { getTokenBalance } from '@/providers/ethereum/getTokenBalance.js';
import { isNativeToken } from '@/providers/ethereum/isNativeToken.js';
import { EthereumNetwork } from '@/providers/ethereum/Network.js';
import { type Token, type TransactionOptions, type TransferProvider } from '@/providers/types/Transfer.js';

class Provider implements TransferProvider<ChainId, Address, Hash> {
    async transfer(options: TransactionOptions<ChainId, Address>): Promise<Address> {
        const { token } = options;
        if (token.chainId !== EthereumNetwork.getChainId()) {
            await EthereumNetwork.switchChain(token.chainId);
        }

        let hash: Address;
        if (this.isNativeToken(token)) {
            hash = await this.transferNative(options);
        } else {
            hash = await this.transferContract({ ...options, token });
        }

        await this.waitForTransaction(hash);
        return hash;
    }

    isNativeToken(token: Token): boolean {
        return isNativeToken(token);
    }

    async waitForTransaction(hash: Hash): Promise<void> {
        await waitForTransactionReceipt(config, { hash, chainId: EthereumNetwork.getChainId() });
    }

    async validateBalance({ token, amount }: TransactionOptions<ChainId, Address>): Promise<boolean> {
        const balance = await getTokenBalance(token, await EthereumNetwork.getAccount(), token.chainId);

        return !isGreaterThan(rightShift(amount, token.decimals), `${balance.value}`);
    }

    async validateGas({ token, to }: TransactionOptions<ChainId, Address>): Promise<boolean> {
        const account = await EthereumNetwork.getAccount();
        const nativeBalance = await getBalance(config, {
            address: account,
            chainId: token.chainId,
        });
        const gas = await estimateGas(config, {
            account,
            chainId: token.chainId,
            to,
        });

        return !isLessThan(`${nativeBalance.value}`, `${gas}`);
    }

    private async transferNative({ to, token, amount }: TransactionOptions<ChainId, Address>): Promise<Address> {
        return sendTransaction(config, {
            account: await EthereumNetwork.getAccount(),
            to,
            value: parseUnits(amount, token.decimals),
        });
    }

    private async transferContract({ to, token, amount }: TransactionOptions<ChainId, Address>): Promise<Address> {
        return writeContract(config, {
            address: token.id,
            abi: erc20Abi,
            functionName: 'transfer',
            args: [to, parseUnits(amount, token.decimals)],
        });
    }
}

export const EthereumTransfer = new Provider();
