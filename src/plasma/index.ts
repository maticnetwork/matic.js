import { ERC20 } from "./erc20";
import { ERC721 } from "./erc721";
import { Web3SideChainClient } from "../utils";
import { IPlasmaClientConfig, IPlasmaContracts } from "../interfaces";
import { DepositManager } from "./deposit_manager";
import { LOGGER } from "../constant";
import { RegistryContract } from "./registry";
import { Ether } from "./ether";
import { ExitManager, RootChain } from "../pos";
import { WithdrawManager } from "./withdraw_manager";

export class PlasmaClient {

    private client_: Web3SideChainClient;

    withdrawManager: WithdrawManager;
    exitManager: ExitManager;

    depositManager: DepositManager;
    registry: RegistryContract;
    rootChain: RootChain;

    private getContracts_() {
        return {
            depositManager: this.depositManager,
            exitManager: this.exitManager,
            registry: this.registry,
            withdrawManager: this.withdrawManager
        } as IPlasmaContracts;
    }

    erc20(tokenAddress: string, isParent?: boolean) {
        return new ERC20(
            tokenAddress,
            isParent,
            this.client_,
            this.getContracts_()
        );
    }

    erc721(tokenAddress: string, isParent?: boolean) {
        return new ERC721(
            tokenAddress,
            isParent,
            this.client_,
            this.depositManager
        );
    }

    constructor(config: IPlasmaClientConfig) {
        const client = this.client_ = new Web3SideChainClient(config);
        LOGGER.enableLog(config.log);
    }

    init() {
        const client = this.client_;
        let config: IPlasmaClientConfig = client.config;

        return client.init().then(_ => {
            const mainContracts = client.mainPlasmaContracts;
            client.config = config = Object.assign(
                {
                    rootChain: mainContracts.RootChainProxy,
                    registry: mainContracts.Registry,
                    depositManager: mainContracts.DepositManagerProxy,
                    withdrawManager: mainContracts.WithdrawManagerProxy,
                },
                config
            );

            this.rootChain = new RootChain(
                client,
                config.rootChain
            );

            this.registry = new RegistryContract(
                client,
                client.config.registry,
            );

            return this.client_.getABI("DepositManager").then(abi => {
                this.depositManager = new DepositManager(
                    client.parent,
                    client.config.depositManager,
                    abi
                );
                return this;
            });
        });
    }

    ether(isParent?) {
        return new Ether(isParent, this.client_, this.getContracts_());
    }

}
