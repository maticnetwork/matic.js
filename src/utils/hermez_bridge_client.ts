import { Web3SideChainClient } from "../utils";
import { BridgeUtil, HermezBridge } from "../hermez";
import { service } from "../services";

export class HermezBridgeClient<T> {

    client: Web3SideChainClient<T> = new Web3SideChainClient();
    bridgeUtil: BridgeUtil;
    rootChainBridge: HermezBridge;
    childChainBridge: HermezBridge;

    /**
     * check whether a txHash is synced with child chain 
     *
     * @param {string} txHash
     * @returns
     * @memberof HermezBridgeClient
     */
    isDepositClaimable(txHash: string) {
        return Promise.all([this.rootChainBridge.networkID(), this.bridgeUtil.getBridgeLogData(
            txHash, true
        )]).then(result => {
            return service.hermezNetwork.getBridgeTransactionDetails(result[0], result[1].depositCount);
        }).then(details => {
            return details.ready_for_claim;
        });
    }

    /**
     * check whether proof is submitted on parent chain
     *
     * @param {string} txHash
     * @returns
     * @memberof HermezBridgeClient
     */
    isWithdrawExitable(txHash: string) {
        return Promise.all([this.childChainBridge.networkID(), this.bridgeUtil.getBridgeLogData(
            txHash, false
        )]).then(result => {
            return service.hermezNetwork.getBridgeTransactionDetails(result[0], result[1].depositCount);
        }).then(details => {
            return details.ready_for_claim;
        });
    }

    /**
     * check whether deposit is completed
     *
     * @param {string} txHash
     * @returns
     * @memberof HermezBridgeClient
     */
    isDeposited(txHash: string) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, true
        ).then(result => {
            return this.childChainBridge.isClaimed(result.depositCount);
        });
    }

    /**
     * check whether deposit is completed
     *
     * @param {string} txHash
     * @returns
     * @memberof HermezBridgeClient
     */
    isExited(txHash: string) {
        return this.bridgeUtil.getBridgeLogData(
            txHash, false
        ).then(result => {
            return this.rootChainBridge.isClaimed(result.depositCount);
        });
    }

}
