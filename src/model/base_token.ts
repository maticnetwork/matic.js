import { Web3SideChainClient } from "./web3_side_chain_client";

export class BaseToken {


    constructor(
        public client: Web3SideChainClient,
        public abi
    ) { }

    getContract(address: string, isParent: boolean) {
        const client = isParent ? this.client.parent.client :
            this.client.child.client;
        return client.getContract(address, this.abi);
    }

    get parentDefaultConfig() {
        return this.client.config.parent.defaultConfig;
    }

    get childDefaultConfig() {
        return this.client.config.child.defaultConfig;
    }

}