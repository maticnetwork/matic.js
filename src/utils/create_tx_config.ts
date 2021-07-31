import { ITransactionResult, ITransactionConfig } from "@/interfaces";
import { BaseWeb3Client } from "@/model";

export const createTransactionConfig = async (txConfig: ITransactionConfig, defaultTxConfig: ITransactionConfig, txResult: ITransactionResult, client: BaseWeb3Client) => {
    txConfig = txConfig || {};
    txConfig = Object.assign(defaultTxConfig, txConfig);

    const [gas, gasPrice, nonce, chainId] = await Promise.all([
        !(txConfig.gas)
            ? txResult.estimateGas({ from: txConfig.from, value: txConfig.value })
            : txConfig.gas,
        !txConfig.gasPrice ? client.getGasPrice() : txConfig.gasPrice,
        !txConfig.nonce ? client.getTransactionCount(txConfig.from as string, 'pending') : txConfig.nonce,
        !txConfig.chainId ? client.getChainId() : txConfig.chainId,
    ]);

    txConfig.gas = gas;
    txConfig.gasPrice = gasPrice;
    txConfig.nonce = nonce;
    txConfig.chainId = chainId;
    return txConfig;
};