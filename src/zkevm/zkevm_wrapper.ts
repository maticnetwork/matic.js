import { BaseToken, Web3SideChainClient } from "../utils";
import { IZkEvmClientConfig, ITransactionOption } from "../interfaces";

export class ZkEVMWrapper extends BaseToken<IZkEvmClientConfig> {

    constructor(client_: Web3SideChainClient<IZkEvmClientConfig>, address: string) {
        super({
            address: address,
            name: 'ZkEVMWrapper',
            bridgeType: 'zkevm',
            isParent: true
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    depositWithGas(
        tokenAddress: string,
        depositAmount: string,
        userAddress: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "deposit",
            tokenAddress,
            depositAmount,
            userAddress,
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    depositPermitWithGas(
        tokenAddress: string,
        depositAmount: string,
        userAddress: string,
        deadline: string,
        v: number,
        r: string,
        s: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "deposit",
            tokenAddress,
            depositAmount,
            userAddress,
            deadline,
            v,
            r,
            s
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

}
