import { BaseToken, Web3SideChainClient } from "../utils";
import { ITransactionOption } from "../interfaces";

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

    async exit(exitPayload: string, option: ITransactionOption) {
        const method = this.method("exit", exitPayload);
        return this.processWrite(
            method,
            option
        );
    }

    isExitProcessed(exitHash: string) {
        return this.method(
            "processedExits", exitHash
        ).read<boolean>();
    }

}