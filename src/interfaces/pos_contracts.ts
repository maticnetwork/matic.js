import { ExitUtil, RootChainManager, GasSwapper } from "../pos";

export interface IPOSContracts {
    rootChainManager: RootChainManager;
    exitUtil: ExitUtil;
    gasSwapper: GasSwapper;
}