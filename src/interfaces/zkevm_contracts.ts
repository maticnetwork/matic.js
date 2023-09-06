import { ZkEvmBridge, BridgeUtil, ZkEVMWrapper } from "../zkevm";
import { ZkEVMBridgeAdapter } from '../zkevm/zkevm_custom_bridge';

export interface IZkEvmContracts {
    parentBridge: ZkEvmBridge;
    childBridge: ZkEvmBridge;
    bridgeUtil: BridgeUtil;
    zkEVMWrapper: ZkEVMWrapper;
}
