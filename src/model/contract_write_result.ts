import { ISendResult, ITransactionReceipt } from "../interfaces";

export class ContractWriteResult {
    private result_: ISendResult;

    constructor(result_: ISendResult) {
        this.result_ = result_;
    }

    getReceipt() {
        return new Promise<ITransactionReceipt>((res, rej) => {
            this.result_.onReceipt = res;
            this.result_.onError = rej;
        });
    }

    getTransactionHash() {
        return new Promise<string>((res, rej) => {
            this.result_.onTransactionHash = res;
            this.result_.onError = rej;
        });
    }
}