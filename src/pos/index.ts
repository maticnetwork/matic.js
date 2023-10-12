import { ERC20 } from "./erc20";
import { RootChainManager } from "./root_chain_manager";
import { BridgeClient } from "../utils";
import { IPOSClientConfig, IPOSContracts, ITransactionOption } from "../interfaces";
import { ExitUtil } from "./exit_util";
import { RootChain } from "./root_chain";
import { ERC721 } from "./erc721";
import { TYPE_AMOUNT } from "../types";
import { ERC1155 } from "./erc1155";
import { GasSwapper } from "./gas_swapper";

export * from "./exit_util";
export * from "./root_chain_manager";
export * from "./root_chain";
export * from "./gas_swapper";

export class POSClient extends BridgeClient<IPOSClientConfig> {

    rootChainManager: RootChainManager;
    gasSwapper: GasSwapper;

    init(config: IPOSClientConfig) {
        const client = this.client;

        return client.init(config).then(_ => {
            const mainPOSContracts = client.mainPOSContracts;
            client.config = config = Object.assign(
                {
                    rootChainManager: mainPOSContracts.RootChainManagerProxy,
                    rootChain: client.mainPlasmaContracts.RootChainProxy,
                    gasSwapper: mainPOSContracts.GasSwapper
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

            this.gasSwapper = new GasSwapper(
                this.client,
                config.gasSwapper
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

    depositEtherWithGas(
        amount: TYPE_AMOUNT,
        userAddress: string,
        swapEthAmount: TYPE_AMOUNT,
        swapCallData: string,
        option: ITransactionOption
    ) {
        return new ERC20(
            '', true, this.client,
            this.getContracts_.bind(this),
        )['depositEtherWithGas_'](amount, userAddress, swapEthAmount, swapCallData, option);
    }

    private getContracts_() {
        return {
            exitUtil: this.exitUtil,
            rootChainManager: this.rootChainManager,
            gasSwapper: this.gasSwapper
        } as IPOSContracts;
    }
}