import { ERC20 } from "./erc20";
import { RootChainManager } from "./root_chain_manager";
import { Web3SideChainClient } from "../model";
import { IPOSClientConfig } from "../interfaces";
import { LOGGER } from "../constant";
import { ExitManager } from "./exit_manager";
import { RootChain } from "./root_chain";
import { initService } from "../services";

export class POSClient {

    rootChainManager: RootChainManager;
    rootChain: RootChain;
    private client_: Web3SideChainClient;

    exitManager: ExitManager;


    constructor(config: IPOSClientConfig) {
        this.client_ = new Web3SideChainClient(config);


        const mainPOSContracts = this.client_.mainPOSContracts;
        initService(this.client_.metaNetwork.Matic.NetworkAPI);
        config = Object.assign(
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
            this.client_.child.client,
            this.rootChain,
            config.requestConcurrency
        );

        LOGGER.enableLog(config.log);
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

    /**
     * check whether a txHash is checkPointed 
     *
     * @param {string} txHash
     * @returns
     * @memberof POSClient
     */
    isCheckPointed(txHash: string) {
        return this.exitManager.isCheckPointed(
            txHash
        );
    }

    getBalanceUsingRPC() {
        return this.client_.child.client.sendRPCRequest({
            jsonrpc: '2.0',
            method: 'eth_getBalance',
            params: [
                '0x0ef2e86a73c7be7f767d7abe53b1d4cbfbccbf3a',
                'latest'
            ],
            id: new Date().getTime()
        });
    }
}