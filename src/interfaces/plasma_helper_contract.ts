import { RegistryContract } from "../plasma/registry";
import { WithdrawManager } from "../plasma/withdraw_manager";
import { ExitUtil } from "../pos/exit_util";
import { DepositManager } from "../plasma/deposit_manager";

export interface IPlasmaContracts {
    depositManager: DepositManager;
    registry: RegistryContract;
    exitManager: ExitUtil;
    withdrawManager: WithdrawManager;
}