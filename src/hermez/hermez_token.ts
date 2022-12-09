import { BaseToken, Web3SideChainClient } from "../utils";
import { IContractInitParam, IHermezClientConfig } from "../interfaces";
import { IHermezContracts } from "../interfaces";

export class HermezToken extends BaseToken<IHermezClientConfig> {

    constructor(
        contractParam: IContractInitParam,
        client: Web3SideChainClient<IHermezClientConfig>,
        protected getHermezContracts: () => IHermezContracts
    ) {
        super(contractParam, client);
    }

    protected get parentBridge() {
        return this.getHermezContracts().parentBridge;
    }

    protected get childBridge() {
        return this.getHermezContracts().childBridge;
    }

    protected get bridgeUtil() {
        return this.getHermezContracts().bridgeUtil;
    }

}
