import { BaseContract } from "@/model";
import Contract from "web3/eth/contract";
import { ITransactionConfig, ITransactionResult } from "@/interfaces";
import { doNothing } from "@/helpers";

export class Web3Contract extends BaseContract {
    contract: Contract;

    constructor(address: string, contract: Contract) {
        super(address);
        this.contract = contract;
    }

    read<T>(methodName: string, tx: ITransactionConfig, ...args): Promise<T> {
        return this.contract.methods[methodName](...args).call(tx as any);
    }

    write(methodName: string, tx: ITransactionConfig, ...args) {
        const result = {
            onTransactionHash: (doNothing as any),
            onReceipt: doNothing,
            onError: doNothing
        };
        const method = this.contract.methods[methodName](...args);
        setTimeout(() => {
            method.send(tx as any).
                once("transactionHash", result.onTransactionHash).
                once("receipt", result.onTransactionHash).
                once("error", result.onError);
        }, 0);
        return result;
    }

    createTransaction(methodName: string, tx: ITransactionConfig, ...args) {
        return this.contract.methods[methodName](...args) as ITransactionResult;
    }
}