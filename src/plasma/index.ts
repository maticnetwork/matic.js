import { ERC20 } from "./erc20";
import { Web3SideChainClient } from "@/model";
import { IPlasmaClientConfig } from "../interfaces";
import { DepositManager } from "./deposit_manager";

export class PlasmaClient {

    erc20: ERC20;

    private client_: Web3SideChainClient;

    withdrawManager;

    depositManager: DepositManager;

    constructor(config: IPlasmaClientConfig) {
        this.client_ = new Web3SideChainClient(config);
        this.erc20 = new ERC20(
            this.client_,
            this.client_.getABI('ChildERC20'),
            this.depositManager
        );

        const mainContracts = this.client_.mainContracts;

        config = Object.assign(
            {
                depositManager: mainContracts.DepositManagerProxy,
                withdrawManager: mainContracts.WithdrawManagerProxy,
            },
            config
        );

        this.depositManager = new DepositManager(
            this.client_.parent.client,
            config.depositManager,
            this.client_.getABI("DepositManager")
        );
    }

}