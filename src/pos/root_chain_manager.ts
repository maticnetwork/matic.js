import { BaseContract, BaseWeb3Client, BaseToken, Web3SideChainClient } from "../model";
import { TYPE_AMOUNT } from "../types";
import BN from "bn.js";
import { BIG_ONE, CHECKPOINT_INTERVAL, BIG_TWO, LOGGER } from "../constant";
import { ITransactionOption } from "../interfaces";
import { formatAmount } from "../utils";

export class RootChainManager extends BaseToken {

    constructor(client_: Web3SideChainClient, address: string) {
        super({
            tokenAddress: address,
            abi: client_.getABI('RootChainManager', 'pos'),
            isParent: true
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.contract.method(methodName, ...args);
    }

    deposit(userAddress: string, tokenAddress: string, depositData: string, option?: ITransactionOption) {
        const method = this.method(
            "depositFor",
            userAddress,
            tokenAddress,
            depositData
        );

        return this.processWrite(method, option);
    }

    async exit(payload: string, option: ITransactionOption) {
        const method = this.method("exit", payload);
        return this.processWrite(
            method,
            option
        );
    }

}