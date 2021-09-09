import { BaseContractMethod } from "../abstracts";
import { ContractFunction, Contract } from "ethers";
import { ITransactionConfig, ISendResult } from "../interfaces";
import { doNothing } from "../helpers";
import { Logger } from "../utils";

export class ContractMethod extends BaseContractMethod {
    constructor(logger: Logger, private contract: Contract, private methodName, private args) {
        super(logger);
    }

    encodeABI() {
        return this.contract.interface.functions.encode[this.methodName](...this.args);
    }

    estimateGas(tx: ITransactionConfig) {
        return this.contract.estimateGas[this.methodName](...this.args, tx).then(result => {
            return result.toNumber();
        });
    }

    read(config: ITransactionConfig) {
        return this.getMethod_(config).then(result => {
            if (result._isBigNumber) {
                result = result.toString();
            }
            return result;
        });
    }

    private getMethod_(config: ITransactionConfig) {
        return this.contract[this.methodName](...this.args, config);
    }

    write(config: ITransactionConfig) {
        const result = {
            onTransactionHash: (doNothing as any),
            onReceipt: doNothing,
            onReceiptError: doNothing,
            onTxError: doNothing
        } as ISendResult;
        this.getMethod_(config).then(tx => {
            result.onTransactionHash(tx.transactionHash);
            // wait for 10 sec for confirmation
            // TODO - get the time from user
            return tx.wait(10000);
        }).then(receipt => {
            result.onReceipt(receipt);
        }).catch(err => {
            result.onTxError(err);
            result.onReceiptError(err);
        });
        return result;
    }
}