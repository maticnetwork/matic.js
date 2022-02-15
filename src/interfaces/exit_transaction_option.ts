import { ITransactionOption } from "./transaction_option";

export interface IExitTransactionOption extends ITransactionOption {
    /**
     * event signature for burn transaction
     *
     * @type {string}
     * @memberof IExitTransactionOption
     */
    burnEventSignature?: string;
}