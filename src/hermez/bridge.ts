import { BaseToken, Web3SideChainClient, Converter, promiseResolve } from "../utils";
import { IHermezClientConfig, ITransactionOption } from "../interfaces";
import { TYPE_AMOUNT } from "../types";

export class Bridge extends BaseToken<IHermezClientConfig> {

    networkID_: number;

    constructor(client_: Web3SideChainClient<IHermezClientConfig>, address: string, isParent: boolean) {
        super({
            address: address,
            name: 'Bridge',
            bridgeType: 'hermez',
            isParent: isParent
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    bridgeAsset(
        token: string,
        destinationNetwork: number,
        destinationAddress: string,
        amount: TYPE_AMOUNT,
        permitData: string = '0x',
        option?: ITransactionOption
    ) {
        return this.method(
            "bridgeAsset",
            token,
            destinationNetwork,
            destinationAddress,
            Converter.toHex(amount),
            permitData
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    claimAsset(
        smtProof: string[],
        index: number,
        mainnetExitRoot: string,
        rollupExitRoot: string,
        originNetwork: number,
        originTokenAddress: string,
        destinationNetwork: number,
        destinationAddress: string,
        amount: TYPE_AMOUNT,
        metadata: string,
        option: ITransactionOption
    ) {
        return this.method(
            "claimAsset",
            smtProof,
            index,
            mainnetExitRoot,
            rollupExitRoot,
            originNetwork,
            originTokenAddress,
            destinationNetwork,
            destinationAddress,
            amount,
            metadata
        ).then(method => {
            return this.processWrite(
                method,
                option
            );
        });
    }

    getTokenWrappedAddress(
        originNetwork: number,
        originTokenAddress: string
    ) {
        return this.method(
            "getTokenWrappedAddress", originNetwork, originTokenAddress
        ).then(method => {
            return this.processRead<string>(method);
        });
    }

    precalculatedWrapperAddress(
        originNetwork: number,
        originTokenAddress: string
    ) {
        return this.method(
            "precalculatedWrapperAddress", originNetwork, originTokenAddress
        ).then(method => {
            return this.processRead<string>(method);
        });
    }

    isExitProcessed(exitHash: string) {
        return this.method(
            "processedExits", exitHash
        ).then(method => {
            return this.processRead<boolean>(method);
        });
    }

    wrappedTokenToTokenInfo(wrappedToken: string) {
        return this.method(
            "wrappedTokenToTokenInfo", wrappedToken
        ).then(method => {
            return this.processRead<[number, String]>(method);
        });
    }

    networkID() {
        if (this.networkID_) {
            return promiseResolve<number>(this.networkID_ as any);
        }
        return this.method(
            "networkID"
        ).then(method => {
            return this.processRead<number>(method);
        });
    }

}
