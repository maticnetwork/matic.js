import { ITransactionReceipt } from "./tx_receipt";

export interface ITransactionWriteResult {
    onTransactionHash?: (txHash: string) => void;
    onReceipt?: Function;
    getTransactionHash?: () => Promise<string>;
    getReceipt?: () => Promise<ITransactionReceipt>;
    onReceiptError: Function;
    onTxError: Function;
}