import { BaseToken, Web3SideChainClient } from "../utils";
import { IContractInitParam, IZkEvmClientConfig } from "../interfaces";
import { IZkEvmContracts } from "../interfaces";

export class ZkEvmToken extends BaseToken<IZkEvmClientConfig> {

    constructor(
        contractParam: IContractInitParam,
        client: Web3SideChainClient<IZkEvmClientConfig>,
        protected getZkEvmContracts: () => IZkEvmContracts
    ) {
        super(contractParam, client);
    }

    protected get parentBridge() {
        return this.getZkEvmContracts().parentBridge;
    }

    protected get childBridge() {
        return this.getZkEvmContracts().childBridge;
    }

    protected get bridgeUtil() {
        return this.getZkEvmContracts().bridgeUtil;
    }

}
