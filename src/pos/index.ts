import { ERC20 } from "./erc20";
import { RootChainManager } from "./root_chain_manager";
import { BaseToken, BridgeClient, Web3SideChainClient } from "../utils";
import { IPOSClientConfig, IPOSContracts, ITransactionOption } from "../interfaces";
import { ExitUtil } from "./exit_util";
import { RootChain } from "./root_chain";
import { ERC721 } from "./erc721";
import { TYPE_AMOUNT } from "../types";

export * from "./exit_util";
export * from "./root_chain_manager";
export * from "./root_chain";

export class POSClient extends BridgeClient<IPOSClientConfig> {

    rootChainManager: RootChainManager;

    constructor(config: IPOSClientConfig) {
        super(config);
    }

    init() {
        const client = this.client;
        let config: IPOSClientConfig = client.config;

        return client.init().then(_ => {
            const mainPOSContracts = this.client.mainPOSContracts;
            client.config = config = Object.assign(
                {

                    rootChainManager: mainPOSContracts.RootChainManagerProxy,
                    rootChain: this.client.mainPlasmaContracts.RootChainProxy
                } as IPOSClientConfig,
                config
            );

            this.rootChainManager = new RootChainManager(
                this.client,
                config.rootChainManager,
            );

            const rootChain = new RootChain(
                this.client,
                config.rootChain,
            );

            this.exitUtil = new ExitUtil(
                config,
                this.client.child,
                rootChain,
                config.requestConcurrency
            );

            return this;
        });
    }

    erc20(tokenAddress, isParent?: boolean) {
        return new ERC20(
            tokenAddress,
            isParent,
            this.client,
            this.getContracts_.bind(this)
        );
    }

    erc721(tokenAddress, isParent?: boolean) {
        return new ERC721(
            tokenAddress,
            isParent,
            this.client,
            this.getContracts_.bind(this)
        );
    }

    depositEther(amount: TYPE_AMOUNT, userAddress: string, option: ITransactionOption) {
        return new ERC20(
            '', true, this.client,
            this.getContracts_.bind(this),
        )['depositEther_'](amount, userAddress, option);
    }

    private getContracts_() {
        return {
            exitUtil: this.exitUtil,
            rootChainManager: this.rootChainManager
        } as IPOSContracts;
    }
}