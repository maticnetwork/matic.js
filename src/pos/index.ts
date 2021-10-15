import { ERC20 } from "./erc20";
import { RootChainManager } from "./root_chain_manager";
import { BridgeClient, Web3SideChainClient } from "../utils";
import { IPOSClientConfig } from "../interfaces";
import { ExitManager } from "./exit_manager";
import { RootChain } from "./root_chain";
import { ERC721 } from "./erc721";

export * from "./exit_manager";
export * from "./root_chain_manager";
export * from "./root_chain";

export class POSClient extends BridgeClient {

    rootChainManager: RootChainManager;
    rootChain: RootChain;
    private client_: Web3SideChainClient;



    constructor(config: IPOSClientConfig) {
        super();
        this.client_ = new Web3SideChainClient(config);
    }

    init() {
        const client = this.client_;
        let config: IPOSClientConfig = client.config;

        return client.init().then(_ => {
            const mainPOSContracts = this.client_.mainPOSContracts;
            client.config = config = Object.assign(
                {

                    rootChainManager: mainPOSContracts.RootChainManagerProxy,
                    rootChain: this.client_.mainPlasmaContracts.RootChainProxy
                } as IPOSClientConfig,
                config
            );

            this.rootChainManager = new RootChainManager(
                this.client_,
                config.rootChainManager,
            );

            this.rootChain = new RootChain(
                this.client_,
                config.rootChain,
            );

            this.exitManager = new ExitManager(
                this.client_.child,
                this.rootChain,
                config.requestConcurrency
            );

            return this;
        });
    }

    erc20(tokenAddress, isParent?: boolean) {
        return new ERC20(
            tokenAddress,
            isParent,
            this.client_,
            this.rootChainManager,
            this.exitManager
        );
    }

    erc721(tokenAddress, isParent?: boolean) {
        return new ERC721(
            tokenAddress,
            isParent,
            this.client_,
            this.rootChainManager,
            this.exitManager
        );
    }
}