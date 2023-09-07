import { ZkEvmBridge, BridgeUtil, ZkEVMWrapper } from "../zkevm";

export interface IZkEvmContracts {
    parentBridge: ZkEvmBridge;
    childBridge: ZkEvmBridge;
    bridgeUtil: BridgeUtil;
    zkEVMWrapper: ZkEVMWrapper;
}
