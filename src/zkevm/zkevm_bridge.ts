import { BaseToken, Web3SideChainClient, Converter, promiseResolve } from "../utils";
import { IZkEvmClientConfig, ITransactionOption } from "../interfaces";
import { TYPE_AMOUNT } from "../types";

export class ZkEvmBridge extends BaseToken<IZkEvmClientConfig> {

    networkID_: number;

    constructor(client_: Web3SideChainClient<IZkEvmClientConfig>, address: string, isParent: boolean) {
        super({
            address: address,
            name: 'PolygonZkEVMBridge',
            bridgeType: 'zkevm',
            isParent: isParent
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    /**
     * bridge function to be called on that network from where token is to be transferred to a different network
     *
     * @param {string} token Token address
     * @param {number} destinationNetwork Network at which tokens will be bridged
     * @param {string} destinationAddress Address to which tokens will be bridged
     * @param {TYPE_AMOUNT} amountamount amount of tokens
     * @param {string} [permitData] Permit data to avoid approve call
     * @param {ITransactionOption} [option] 
     * 
     * @returns
     * @memberof ZkEvmBridge
     */
    bridgeAsset(
        destinationNetwork: number,
        destinationAddress: string,
        amount: TYPE_AMOUNT,
        token: string,
        forceUpdateGlobalExitRoot: boolean,
        permitData = '0x',
        option?: ITransactionOption
    ) {
        return this.method(
            "bridgeAsset",
            destinationNetwork,
            destinationAddress,
            Converter.toHex(amount),
            token,
            forceUpdateGlobalExitRoot,
            permitData
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

    /**
     * Claim function to be called on the destination network
     *
     * @param {string[]} smtProof Merkle Proof
     * @param {number} index Deposit Index
     * @param {string} mainnetExitRoot Mainnet Exit Root
     * @param {string} rollupExitRoot RollUP Exit Root
     * @param {number} originNetwork Network at which token was initially deployed
     * @param {string} originTokenAddress Address of token at network where token was initially deployed
     * @param {string} destinationAddress Address to which tokens will be bridged
     * @param {TYPE_AMOUNT} amount amount of tokens
     * @param {string} [metadata] Metadata of token
     * @param {ITransactionOption} [option]
     * 
     * @returns
     * @memberof ZkEvmBridge
     */
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

    /**
     * get the address of token which is created by the bridge contract on the non origin chain
     *
     * @param {number} originNetwork Network at which the token was initially deployed
     * @param {string} originTokenAddress Address at the network where token was initially deployed
     * @returns
     * @memberof ZkEvmBridge
     */
    getMappedTokenInfo(
        originNetwork: number,
        originTokenAddress: string
    ) {
        return this.method(
            "getTokenWrappedAddress", originNetwork, originTokenAddress
        ).then(method => {
            return this.processRead<string>(method);
        });
    }

    /**
     * Tells if claim has already happed or not based on the deposit index
     *
     * @param {number} index
     * @returns
     * @memberof ZkEvmBridge
     */
    isClaimed(
        index: number,
    ) {
        return this.method(
            "isClaimed", index
        ).then(method => {
            return this.processRead<string>(method);
        });
    }

    /**
     * Even if the wrapped contract is not deployed on the destination chain, it will tell us the address which is going to be.
     *
     * @param {number} originNetwork Network at which the token was initially deployed
     * @param {string} originTokenAddress Address at the network where token was initially deployed
     * @returns
     * @memberof ZkEvmBridge
     */
    precalculatedMappedTokenInfo(
        originNetwork: number,
        originTokenAddress: string
    ) {
        return this.method(
            "precalculatedWrapperAddress", originNetwork, originTokenAddress
        ).then(method => {
            return this.processRead<string>(method);
        });
    }

    /**
     * get the address and network of the wrapped token where it was emerged initially
     *
     * @param {number} wrappedToken
     * @returns
     * @memberof ZkEvmBridge
     */
    getOriginTokenInfo(wrappedToken: string) {
        return this.method(
            "wrappedTokenToTokenInfo", wrappedToken
        ).then(method => {
            return this.processRead<[number, string]>(method);
        });
    }

    /**
     * get the network ID for chain in which the bridge contract is deployed
     *
     * @returns
     * @memberof ZkEvmBridge
     */
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
