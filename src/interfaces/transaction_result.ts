import { ITransactionRequestConfig } from "./transaction_config";

export interface ITransactionResult {
	estimateGas(tx?: ITransactionRequestConfig): Promise<number>;
	encodeABI(): string;
}