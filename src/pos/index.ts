import { ERC20 } from "./erc20";
import { RootChainManager } from "./root_chain_manager";
import { BridgeClient } from "../utils";
import { IPOSClientConfig, IPOSContracts, ITransactionOption } from "../interfaces";
import { ExitUtil } from "./exit_util";
import { RootChain } from "./root_chain";
import { ERC721 } from "./erc721";
import { TYPE_AMOUNT } from "../types";
import { ERC1155 } from "./erc1155";

export * from "./exit_util";
export * from "./root_chain_manager";
export * from "./root_chain";

export class POSClient extends BridgeClient<IPOSClientConfig> {

    rootChainManager: RootChainManager;

    init(config: IPOSClientConfig) {
        const client = this.client;

        return client.init(config).then(_ => {
            const mainPOSContracts = client.mainPOSContracts;
            client.config = config = Object.assign(
                {

                    rootChainManager: mainPOSContracts.RootChainManagerProxy,
                    rootChain: client.mainPlasmaContracts.RootChainProxy
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
                this.client,
                rootChain
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

    erc1155(tokenAddress, isParent?: boolean) {
        return new ERC1155(
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