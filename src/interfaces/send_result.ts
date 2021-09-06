export interface ISendResult {
    onTransactionHash: (txHash: string) => void;
    onReceipt: Function;
    onReceiptError: Function;
    onTxError: Function;
}