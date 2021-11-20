// import { ITransactionWriteResult, ITransactionReceipt } from "../interfaces";

// export class ContractWriteResult {
//     private txHashPromise: Promise<string>;
//     private receiptPromise: Promise<ITransactionReceipt>;


//     constructor(private result_: ITransactionWriteResult) {
//         if (!result_.getTransactionHash) {
//             this.txHashPromise = new Promise((res, rej) => {
//                 result_.onTransactionHash = res;
//                 result_.onTxError = rej;
//             });
//         }

//         if (!result_.getReceipt) {
//             this.receiptPromise = new Promise((res, rej) => {
//                 result_.onReceipt = res;
//                 result_.onReceiptError = rej;
//             });
//         }
//     }

//     getTransactionHash() {
//         const fn = this.result_.getTransactionHash;
//         if (fn) {
//             return fn();
//         }
//         return this.txHashPromise;
//     }

//     getReceipt() {
//         const fn = this.result_.getReceipt;
//         if (fn) {
//             return fn();
//         }
//         return this.receiptPromise;
//     }

// }