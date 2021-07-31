import { ITransactionResult, ITransactionConfig } from "@/interfaces";
import { BaseWeb3Client } from "@/model";
import { BaseContractMethod } from "@/abstracts";

interface ITransactionConfigParam {
    txConfig: ITransactionConfig;
    defaultTxConfig: ITransactionConfig;
    method?: BaseContractMethod;
    client?: BaseWeb3Client;
    isWrite?: boolean;
}

export const createTransactionConfig = async ({ txConfig, defaultTxConfig, method, client, isWrite }: ITransactionConfigParam) => {
    txConfig = Object.assign(defaultTxConfig, txConfig || {});
    console.log("txConfig", txConfig);
    if (isWrite) {
        const [gas, gasPrice, nonce, chainId] = await Promise.all([
            !(txConfig.gas)
                ? method.estimateGas({ from: txConfig.from, value: txConfig.value })
                : txConfig.gas,
            !txConfig.gasPrice ? client.getGasPrice() : txConfig.gasPrice,
            !txConfig.nonce ? client.getTransactionCount(txConfig.from as string, 'pending') : txConfig.nonce,
            !txConfig.chainId ? client.getChainId() : txConfig.chainId,
        ]);

        txConfig.gas = gas;
        txConfig.gasPrice = gasPrice;
        txConfig.nonce = nonce;
        txConfig.chainId = chainId;
    }
    return txConfig;
};