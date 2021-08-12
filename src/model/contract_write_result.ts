import { ISendResult, ITransactionReceipt } from "../interfaces";

export class ContractWriteResult {
    private txHashPromise: Promise<string>;
    private receiptPromise: Promise<string>;

    constructor(result: ISendResult) {
        this.txHashPromise = new Promise((res, rej) => {
            result.onTransactionHash = res;
            result.onError = rej;
        });
        this.receiptPromise = new Promise((res, rej) => {
            result.onReceipt = res;
            result.onError = rej;
        });
    }

    getReceipt() {
        return this.receiptPromise;
    }

    getTransactionHash() {
        return this.txHashPromise;
    }
}