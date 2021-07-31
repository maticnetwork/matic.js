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
            this.method.send(tx as any).
                once("transactionHash", result.onTransactionHash).
                once("receipt", result.onTransactionHash).
                once("error", result.onError);
        }, 0);
        return result;
    }

    estimateGas(tx: ITransactionConfig): Promise<number> {
        console.log("args", arguments);
        return this.method.estimateGas(tx as any);
    }

}