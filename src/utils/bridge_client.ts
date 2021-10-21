import { ExitUtil } from "../pos";

export class BridgeClient {
    exitUtil: ExitUtil;

    /**
     * check whether a txHash is checkPointed 
     *
     * @param {string} txHash
     * @returns
     * @memberof BridgeClient
     */
    isCheckPointed(txHash: string) {
        return this.exitUtil.isCheckPointed(
            txHash
        );
    }

}