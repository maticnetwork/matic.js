import { ERC20 } from "./erc20";
import { RootChainManager } from "./root_chain_manager";
import { BaseToken, BridgeClient, Web3SideChainClient } from "../utils";
import { IPOSClientConfig, ITransactionOption } from "../interfaces";
import { ExitUtil } from "./exit_util";
import { RootChain } from "./root_chain";
import { ERC721 } from "./erc721";
import { TYPE_AMOUNT } from "../types";

export * from "./exit_util";
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

            this.exitUtil = new ExitUtil(
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
            this.exitUtil
        );
    }

    erc721(tokenAddress, isParent?: boolean) {
        return new ERC721(
            tokenAddress,
            isParent,
            this.client_,
            this.rootChainManager,
            this.exitUtil
        );
    }

    depositEther(amount: TYPE_AMOUNT, option: ITransactionOption) {
        return new ERC20(
            '', true, this.client_,
            this.rootChainManager,
            this.exitUtil
        )['depositEther__'](amount, option);
    }
}