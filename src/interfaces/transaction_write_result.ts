import { ITransactionReceipt } from "./tx_receipt";

export interface ITransactionWriteResult {

    getTransactionHash: () => Promise<string>;
    getReceipt: () => Promise<ITransactionReceipt>;
}