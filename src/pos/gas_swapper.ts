import { BaseToken, Web3SideChainClient } from "../utils";
import { IPOSClientConfig, ITransactionOption } from "../interfaces";

export class GasSwapper extends BaseToken<IPOSClientConfig> {

    constructor(client_: Web3SideChainClient<IPOSClientConfig>, address: string) {
        super({
            address: address,
            name: 'GasSwapper',
            bridgeType: 'pos',
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
        swapCallData: string,
        option?: ITransactionOption
    ) {
        return this.method(
            "swapAndBridge",
            tokenAddress,
            depositAmount,
            userAddress,
            swapCallData
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

}
