import { RegistryContract } from "../plasma/registry";
import { WithdrawManager } from "../plasma/withdraw_manager";
import { ExitManager } from "../pos/exit_manager";
import { DepositManager } from "../plasma/deposit_manager";

export interface IPlasmaContracts {
    depositManager: DepositManager;
    registry: RegistryContract;
    exitManager: ExitManager;
    withdrawManager: WithdrawManager;
}