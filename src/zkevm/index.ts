import { ERC20 } from "./erc20";
import { ZkEvmBridge } from "./zkevm_bridge";
import { BridgeUtil } from "./bridge_util";
import { ZkEvmBridgeClient } from "../utils";
import { IZkEvmClientConfig, IZkEvmContracts } from "../interfaces";
import { config as urlConfig } from "../config";
import { service, NetworkService } from "../services";

export * from "./zkevm_bridge";
export * from "./bridge_util";

export class ZkEvmClient extends ZkEvmBridgeClient {

    init(config: IZkEvmClientConfig) {
        const client = this.client;

        return client.init(config).then(_ => {
            const mainZkEvmContracts = client.mainZkEvmContracts; 
            const zkEvmContracts = client.zkEvmContracts;
            client.config = config = Object.assign(
                {
                    parentBridge: mainZkEvmContracts.PolygonZkEVMBridgeProxy,
                    childBridge: zkEvmContracts.PolygonZkEVMBridge,
                } as IZkEvmClientConfig,
                config
            );

            this.rootChainBridge = new ZkEvmBridge(
                this.client,
                config.parentBridge,
                true
            );

            this.childChainBridge = new ZkEvmBridge(
                this.client,
                config.childBridge,
                false
            );

            this.bridgeUtil = new BridgeUtil(
                this.client
            );

            if (!service.zkEvmNetwork) {
                if (urlConfig.zkEvmBridgeService[urlConfig.zkEvmBridgeService.length - 1] !== '/') {
                    urlConfig.zkEvmBridgeService += '/';
                }
                urlConfig.zkEvmBridgeService += 'api/zkevm/';
                service.zkEvmNetwork = new NetworkService(urlConfig.zkEvmBridgeService);
            }

            return this;
        });
    }

    /**
     * creates instance of ERC20 token
     *
     * @param {string} tokenAddress
     * @param {boolean} isParent
     * 
     * @returns
     * @memberof ERC20
     */
    erc20(tokenAddress: string, isParent?: boolean) {
        return new ERC20(
            tokenAddress,
            isParent,
            this.client,
            this.getContracts_.bind(this)
        );
    }

    private getContracts_() {
        return {
            parentBridge: this.rootChainBridge,
            childBridge: this.childChainBridge,
            bridgeUtil: this.bridgeUtil
        } as IZkEvmContracts;
    }
}
