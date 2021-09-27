export interface ITransactionWriteResult {
    onTransactionHash: (txHash: string) => void;
    onReceipt: Function;
    onReceiptError: Function;
    onTxError: Function;
}