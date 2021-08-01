import { BaseContractMethod } from "@/abstracts";
import { ITransactionConfig } from "@/interfaces";
import { TransactionObject } from "web3/eth/types";
import { doNothing } from "@/helpers";

export class EthMethod extends BaseContractMethod {

    constructor(private method: TransactionObject<any>) {
        super();
    }

    read<T>(tx: ITransactionConfig): Promise<T> {
        console.log("args", arguments);
        return this.method.call(tx as any);
    }

    write(tx: ITransactionConfig) {
        const result = {
            onTransactionHash: (doNothing as any),
            onReceipt: doNothing,
            onError: doNothing
        };
        setTimeout(() => {
            console.log("sending tx", tx);
            // {
            //     chainId: tx.chainId,
            //     data: tx.data,
            //     from: tx.from.toString(),
            //     gas: tx.gas,
            //     gasPrice: tx.gasPrice.toString(),
            //     nonce: tx.nonce,
            //     to: tx.to,
            //     value: tx.value?.toString()
            // }
            try {
                this.method.send(tx as any).
                    once("transactionHash", result.onTransactionHash).
                    once("receipt", result.onTransactionHash).
                    once("error", result.onError);
            } catch (error) {

            }
        }, 0);
        return result;
    }

    estimateGas(tx: ITransactionConfig): Promise<number> {
        console.log("args", arguments);
        return this.method.estimateGas(tx as any);
    }

}