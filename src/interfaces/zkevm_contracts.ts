import { ZkEvmBridge, BridgeUtil } from "../zkevm";

export interface IZkEvmContracts {
    parentBridge: ZkEvmBridge;
    childBridge: ZkEvmBridge;
    bridgeUtil: BridgeUtil;
}
