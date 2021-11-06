import { ITransactionRequestConfig } from "./transaction_config";

export interface ITransactionOption extends ITransactionRequestConfig {
    returnTransaction?: boolean;
}