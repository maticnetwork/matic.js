import { ERC20 } from "./erc20";
import { HermezBridge } from "./hermez_bridge";
import { BridgeUtil } from "./bridge_util";
import { HermezBridgeClient, setHermezProofApi } from "../utils";
import { IHermezClientConfig, IHermezContracts } from "../interfaces";
import { config as urlConfig } from "../config";
import { service, NetworkService } from "../services";

export * from "./hermez_bridge";
export * from "./bridge_util";

export class HermezClient extends HermezBridgeClient<IHermezClientConfig> {

    init(config: IHermezClientConfig) {
        const client = this.client;

        return client.init(config).then(_ => {
            const mainHermezContracts = client.mainContracts;
            const hermezContracts = client.hermezContracts;
            client.config = config = Object.assign(
                {
                    parentBridge: mainHermezContracts.PolygonZkEVMBridgeProxy,
                    childBridge: hermezContracts.PolygonZkEVMBridge,
                } as IHermezClientConfig,
                config
            );

            this.rootChainBridge = new HermezBridge(
                this.client,
                config.parentBridge,
                true
            );

            this.childChainBridge = new HermezBridge(
                this.client,
                config.childBridge,
                false
            );

            this.bridgeUtil = new BridgeUtil(
                this.client
            );

            if (!service.network) {
                if (urlConfig.hermezBridgeService[urlConfig.hermezBridgeService.length - 1] !== '/') {
                    urlConfig.hermezBridgeService += '/';
                }
                service.network = new NetworkService(urlConfig.hermezBridgeService);
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
        } as IHermezContracts;
    }
}
