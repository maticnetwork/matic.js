import { BaseToken, Web3SideChainClient } from "../utils";
import { ITransactionOption } from "../interfaces";

export class RootChainManager extends BaseToken {

    constructor(client_: Web3SideChainClient, address: string) {
        super({
            address: address,
            name: 'RootChainManager',
            bridgeType: 'pos',
            isParent: true
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    deposit(userAddress: string, tokenAddress: string, depositData: string, option?: ITransactionOption) {
        return this.method(
            "depositFor",
            userAddress,
            tokenAddress,
            depositData
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    async exit(exitPayload: string, option: ITransactionOption) {
        return this.method("exit", exitPayload).then(method => {
            return this.processWrite(
                method,
                option
            );
        });
    }

    isExitProcessed(exitHash: string) {
        return this.method(
            "processedExits", exitHash
        ).then(method => {
            return method.read<boolean>();
        });
    }

}