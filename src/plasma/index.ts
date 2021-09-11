import { ERC20 } from "./erc20";
import { ERC721 } from "./erc721";
import { Web3SideChainClient } from "../utils";
import { IPlasmaClientConfig } from "../interfaces";
import { DepositManager } from "./deposit_manager";
import { LOGGER } from "../constant";

export class PlasmaClient {

    private client_: Web3SideChainClient;

    withdrawManager;

    depositManager: DepositManager;

    erc20(tokenAddress: string, isParent?: boolean) {
        return new ERC20(
            tokenAddress,
            isParent,
            this.client_,
            this.depositManager
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
        this.client_ = new Web3SideChainClient(config);


        const mainContracts = this.client_.mainPlasmaContracts;

        config = Object.assign(
            {
                depositManager: mainContracts.DepositManagerProxy,
                withdrawManager: mainContracts.WithdrawManagerProxy,
            },
            config
        );


        LOGGER.enableLog(config.log);
    }

    init() {
        const client = this.client_;
        return this.client_.getABI("DepositManager").then(abi => {
            this.depositManager = new DepositManager(
                client.parent,
                client.config.depositManager,
                abi
            );
        });
    }

}
