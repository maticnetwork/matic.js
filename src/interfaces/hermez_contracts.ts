import { HermezBridge, BridgeUtil } from "../hermez";

export interface IHermezContracts {
    parentBridge: HermezBridge;
    childBridge: HermezBridge;
    bridgeUtil: BridgeUtil;
}
