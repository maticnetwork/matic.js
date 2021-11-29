import { BaseBigNumber } from "../abstracts";

export interface ITransactionRequestConfig {
    from?: string;
    to?: string;
    value?: number | string | BaseBigNumber;
    gasLimit?: number | string;
    gasPrice?: number | string | BaseBigNumber;
    data?: string;
    nonce?: number;
    chainId?: number;
    chain?: string;
    hardfork?: string;
    maxFeePerGas?: number | string;
    maxPriorityFeePerGas?: number | string;
    type?: number;
}