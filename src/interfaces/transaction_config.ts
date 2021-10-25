import BN from "bn.js";

export interface ITransactionConfig {
    from?: string | number;
    to?: string;
    value?: number | string | BN;
    gasLimit?: number | string;
    gasPrice?: number | string | BN;
    data?: string;
    nonce?: number;
    chainId?: number;
    chain?: string;
    hardfork?: string;
    maxFeePerGas?: number | string;
    maxPriorityFeePerGas?: number | string;
}