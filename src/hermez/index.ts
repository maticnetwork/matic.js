import { ERC20 } from "./erc20";
import { Bridge } from "./bridge";
import { BridgeUtil } from "./bridge_util";
import { HermezBridgeClient, setHermezProofApi } from "../utils";
import { IHermezClientConfig, IHermezContracts } from "../interfaces";
import { config as urlConfig } from "../config";

export * from "./bridge";
export * from "./bridge_util";

export class HermezClient extends HermezBridgeClient<IHermezClientConfig> {

    init(config: IHermezClientConfig) {
        const client = this.client;

        return client.init(config).then(_ => {
            const mainHermezContracts = client.mainHermezContracts;
            const hermezContracts = client.hermezContracts;
            client.config = config = Object.assign(
                {
                    parentBridge: mainHermezContracts.BridgeProxy,
                    childBridge: hermezContracts.BridgeProxy,
                } as IHermezClientConfig,
                config
            );

            this.rootChainBridge = new Bridge(
                this.client,
                config.parentBridge,
                true
            );

            this.childChainBridge = new Bridge(
                this.client,
                config.childBridge,
                false
            );

            this.bridgeUtil = new BridgeUtil(
                this.client
            );

            setHermezProofApi(urlConfig.hermezBridgeService, false);

            return this;
        });
    }

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