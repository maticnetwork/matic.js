import { ERC20 } from "./erc20";
import { ERC721 } from "./erc721";
import { BridgeClient, Web3SideChainClient } from "../utils";
import { IPlasmaClientConfig, IPlasmaContracts, ITransactionOption } from "../interfaces";
import { DepositManager } from "./deposit_manager";
import { RegistryContract } from "./registry";
import { ExitManager, RootChain } from "../pos";
import { WithdrawManager } from "./withdraw_manager";
import { MATIC_TOKEN_ADDRESS_ON_POLYGON } from "../constant";
import { TYPE_AMOUNT } from "../types";

export class PlasmaClient extends BridgeClient {

    private client_: Web3SideChainClient;

    withdrawManager: WithdrawManager;

    depositManager: DepositManager;
    registry: RegistryContract;
    rootChain: RootChain;


    constructor(config: IPlasmaClientConfig) {
        super();
        this.client_ = new Web3SideChainClient(config);
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

            this.depositManager = new DepositManager(
                client,
                client.config.depositManager
            );

            this.exitManager = new ExitManager(
                client.child,
                this.rootChain,
                config.requestConcurrency
            );

            this.withdrawManager = new WithdrawManager(
                client,
                client.config.withdrawManager,
            );

            return this;
        });
    }

    private getContracts__() {
        return {
            depositManager: this.depositManager,
            exitManager: this.exitManager,
            registry: this.registry,
            withdrawManager: this.withdrawManager
        } as IPlasmaContracts;
    }

    erc20(tokenAddress: string, isParent?: boolean) {
        tokenAddress = tokenAddress == null && !isParent ?
            MATIC_TOKEN_ADDRESS_ON_POLYGON : tokenAddress;

        return new ERC20(
            tokenAddress,
            isParent,
            this.client_,
            this.getContracts__()
        );
    }

    erc721(tokenAddress: string, isParent?: boolean) {
        return new ERC721(
            tokenAddress,
            isParent,
            this.client_,
            this.getContracts__()
        );
    }

    withdrawExit(tokens: string | string[], option?: ITransactionOption) {
        return this.withdrawManager.withdrawExit(
            tokens, option
        );
    }

    depositEther(amount: TYPE_AMOUNT, option: ITransactionOption) {
        return new ERC20(
            '', true, this.client_,
            this.getContracts__()
        )['depositEther__'](amount, option);
    }

}
