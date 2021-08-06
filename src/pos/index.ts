import { ERC20 } from "./erc20";
import { RootChainManager } from "./root_chain_manager";
import { Web3SideChainClient } from "../model";
import { IPlasmaClientConfig, IPOSClientConfig } from "../interfaces";
import { LOGGER } from "../constant";

export class POSClient {

    rootChainManager: RootChainManager;
    private client_: Web3SideChainClient;


    constructor(config: IPOSClientConfig) {
        this.client_ = new Web3SideChainClient(config);


        const mainContracts = this.client_.mainContracts;

        config = Object.assign(
            {

                rootChainManager: mainContracts.POSContracts.RootChainManagerProxy
            } as IPOSClientConfig,
            config
        );

        this.rootChainManager = new RootChainManager(
            this.client_.parent.client,
            config.rootChainManager,
            this.client_.getABI('RootChainManager', 'pos')
        );

        LOGGER.enableLog(config.log);
    }

    erc20(tokenAddress, isParent?: boolean) {
        return new ERC20(
            tokenAddress,
            isParent,
            this.client_,
            this.rootChainManager
        );
    }
}