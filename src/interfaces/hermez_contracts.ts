import { Bridge, BridgeUtil } from "../hermez";

export interface IHermezContracts {
    parentBridge: Bridge;
    childBridge: Bridge;
    bridgeUtil: BridgeUtil;
}