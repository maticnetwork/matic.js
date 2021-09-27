import { ITransactionWriteResult, ITransactionReceipt } from "../interfaces";

export class ContractWriteResult {
    private txHashPromise: Promise<string>;
    private receiptPromise: Promise<string>;

    constructor(result: ITransactionWriteResult) {
        this.txHashPromise = new Promise((res, rej) => {
            result.onTransactionHash = res;
            result.onTxError = rej;
        });
        this.receiptPromise = new Promise((res, rej) => {
            result.onReceipt = res;
            result.onReceiptError = rej;
        });
    }

    getReceipt() {
        return this.receiptPromise;
    }

    getTransactionHash() {
        return this.txHashPromise;
    }
}