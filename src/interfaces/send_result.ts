export interface ISendResult {
    onTransactionHash: (txHash: string) => void;
    onReceipt: Function;
    onError: Function;
}