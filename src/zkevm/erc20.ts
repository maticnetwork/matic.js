import { isHexString } from 'ethereumjs-util';
import { ITransactionOption } from "../interfaces";
import { Converter, Web3SideChainClient, promiseAny } from "../utils";
import { ZkEvmToken } from "./zkevm_token";
import { TYPE_AMOUNT } from "../types";
import { BaseContractMethod } from "../abstracts";
import { MAX_AMOUNT, ADDRESS_ZERO, DAI_PERMIT_TYPEHASH, EIP_2612_PERMIT_TYPEHASH, UNISWAP_DOMAIN_TYPEHASH, EIP_2612_DOMAIN_TYPEHASH, Permit, BaseContract, BaseWeb3Client } from "..";
import { IAllowanceTransactionOption, IApproveTransactionOption, IBridgeTransactionOption, IZkEvmClientConfig, IZkEvmContracts } from "../interfaces";

export class ERC20 extends ZkEvmToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient<IZkEvmClientConfig>,
        getContracts: () => IZkEvmContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ERC20',
            bridgeType: 'zkevm'
        }, client, getContracts);
    }

    /**
     * get bridge for that token
     *
     * @returns
     * @memberof ERC20
     */
    getBridgeAddress() {
        const bridge = this.contractParam.isParent ? this.parentBridge : this.childBridge;
        return bridge.contractAddress;
    }

    isEtherToken() {
        return this.contractParam.address === ADDRESS_ZERO;
    }

    /**
     * get token balance of user
     *
     * @param {string} userAddress
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    getBalance(userAddress: string, option?: ITransactionOption) {
        if (this.isEtherToken()) {
            const client = this.contractParam.isParent ? this.client.parent : this.client.child;
            return client.getBalance(userAddress);
        } else {
            return this.getContract().then(contract => {
                const method = contract.method(
                    "balanceOf",
                    userAddress
                );
                return this.processRead<string>(method, option);
            });
        }

    }

    /**
     * is Approval needed to bridge tokens to other chains
     *
     * @returns
     * @memberof ERC20
     */
    isApprovalNeeded() {
        if (this.isEtherToken()) {
            return false;
        }

        const bridge = this.contractParam.isParent ? this.parentBridge : this.childBridge;

        return bridge.getOriginTokenInfo(this.contractParam.address)
            .then(tokenInfo => {
                return tokenInfo[1] === ADDRESS_ZERO;
            });
    }

    /**
     * get allowance of user
     *
     * @param {string} userAddress
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    getAllowance(userAddress: string, option: IAllowanceTransactionOption = {}) {
        this.checkForNonNative("getAllowance");
        const spenderAddress = option.spenderAddress ? option.spenderAddress : this.getBridgeAddress();

        return this.getContract().then(contract => {
            const method = contract.method(
                "allowance",
                userAddress,
                spenderAddress,
            );
            return this.processRead<string>(method, option);
        });
    }

    /**
     * Approve given amount of tokens for user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {IApproveTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    approve(amount: TYPE_AMOUNT, option: IApproveTransactionOption = {}) {
        this.checkForNonNative("approve");
        const spenderAddress = option.spenderAddress ? option.spenderAddress : this.getBridgeAddress();

        return this.getContract().then(contract => {
            const method = contract.method(
                "approve",
                spenderAddress,
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    /**
     * Approve max amount of tokens for user
     *
     * @param {IApproveTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    approveMax(option: IApproveTransactionOption = {}) {
        this.checkForNonNative("approveMax");
        return this.approve(
            MAX_AMOUNT,
            option
        );
    }

    /**
     * Deposit given amount of token for user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    deposit(amount: TYPE_AMOUNT, userAddress: string, option: IBridgeTransactionOption = {}) {
        this.checkForRoot("deposit");
        const permitData = option.permitData || '0x';
        const forceUpdateGlobalExitRoot = option.forceUpdateGlobalExitRoot || true;

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        if (this.isEtherToken()) {
            option.value = Converter.toHex(amount);
        }

        return this.childBridge.networkID().then(networkId => {
            return this.parentBridge.bridgeAsset(
                networkId,
                userAddress,
                amountInABI,
                this.contractParam.address,
                forceUpdateGlobalExitRoot,
                permitData,
                option
            );
        });
    }

    /**
     * Deposit given amount of token for user with permit call
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    depositWithPermit(amount: TYPE_AMOUNT, userAddress: string, option: IApproveTransactionOption = {}) {
        this.checkForRoot("deposit");
        this.checkForNonNative("depositWithPermit");

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        const forceUpdateGlobalExitRoot = option.forceUpdateGlobalExitRoot || true;

        return this.getPermitData(amountInABI, option).then(permitData => {
            return this.childBridge.networkID().then(networkId => {
                return this.parentBridge.bridgeAsset(
                    networkId,
                    userAddress,
                    amountInABI,
                    this.contractParam.address,
                    forceUpdateGlobalExitRoot,
                    permitData,
                    option
                );
            });
        });
    }

    /**
     * Complete deposit after GlobalExitRootManager is synced from Parent to root
     *
     * @param {string} transactionHash
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    depositClaim(transactionHash: string, option?: ITransactionOption) {
        this.checkForChild("depositClaim");
        return this.parentBridge.networkID().then(networkId => {
            return this.bridgeUtil.buildPayloadForClaim(
                transactionHash, true, networkId
            );
        }).then(payload => {
            return this.childBridge.claimAsset(
                payload.smtProof,
                payload.index,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.originNetwork,
                payload.originTokenAddress,
                payload.destinationNetwork,
                payload.destinationAddress,
                payload.amount,
                payload.metadata,
                option
            );
        });
    }

    /**
     * initiate withdraw by burning provided amount
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdraw(amount: TYPE_AMOUNT, userAddress: string, option: IBridgeTransactionOption = {}) {
        this.checkForChild("withdraw");
        const permitData = option.permitData || '0x';
        const forceUpdateGlobalExitRoot = option.forceUpdateGlobalExitRoot || true;

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        if (this.isEtherToken()) {
            option.value = Converter.toHex(amount);
        }

        return this.parentBridge.networkID().then(networkId => {
            return this.childBridge.bridgeAsset(
                networkId,
                userAddress,
                amountInABI,
                this.contractParam.address,
                forceUpdateGlobalExitRoot,
                permitData,
                option
            );
        });
    }

    /**
     * initiate withdraw by transferring amount with PermitData for native tokens
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} userAddress
     * @param {IBridgeTransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawWithPermit(amount: TYPE_AMOUNT, userAddress: string, option: IApproveTransactionOption = {}) {
        this.checkForChild("withdraw");

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        const forceUpdateGlobalExitRoot = option.forceUpdateGlobalExitRoot || true;

        return this.getPermitData(amountInABI, option).then(permitData => {
            return this.parentBridge.networkID().then(networkId => {
                return this.childBridge.bridgeAsset(
                    networkId,
                    userAddress,
                    amountInABI,
                    this.contractParam.address,
                    forceUpdateGlobalExitRoot,
                    permitData,
                    option
                );
            });
        });
    }

    /**
     * Complete deposit after GlobalExitRootManager is synced from Parent to root
     *
     * @param {string} burnTransactionHash
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    withdrawExit(burnTransactionHash: string, option?: ITransactionOption) {
        this.checkForRoot("withdrawExit");
        return this.childBridge.networkID().then(networkId => {
            return this.bridgeUtil.buildPayloadForClaim(
                burnTransactionHash, false, networkId
            );
        }).then(payload => {
            return this.parentBridge.claimAsset(
                payload.smtProof,
                payload.index,
                payload.mainnetExitRoot,
                payload.rollupExitRoot,
                payload.originNetwork,
                payload.originTokenAddress,
                payload.destinationNetwork,
                payload.destinationAddress,
                payload.amount,
                payload.metadata,
                option
            );
        });
    }

    /**
     * transfer amount to another user
     *
     * @param {TYPE_AMOUNT} amount
     * @param {string} to
     * @param {ITransactionOption} [option]
     * @returns
     * @memberof ERC20
     */
    transfer(amount: TYPE_AMOUNT, to: string, option: ITransactionOption = {}) {
        if (this.contractParam.address === ADDRESS_ZERO) {
            option.to = to;
            option.value = Converter.toHex(amount);
            return this.sendTransaction(option);
        }
        return this.transferERC20(to, amount, option);
    }

    /**
     * get permitType of the token
     *
     * @returns
     * @memberof ERC20
     */
    private getPermit() {
        let contract: BaseContract;
        return this.getContract().then(contractInstance => {
            contract = contractInstance;
            const method = contract.method(
                "PERMIT_TYPEHASH",
            );
            return this.processRead<string>(method);
        }).then(permitTypehash => {
            switch (permitTypehash) {
                case DAI_PERMIT_TYPEHASH: {
                    return Permit.DAI;
                }
                case EIP_2612_PERMIT_TYPEHASH: {
                    const DOMAIN_TYPEHASH = contract.method("DOMAIN_TYPEHASH");
                    const EIP712DOMAIN_HASH = contract.method("EIP712DOMAIN_HASH");
                    return promiseAny([this.processRead<string>(DOMAIN_TYPEHASH), this.processRead<string>(EIP712DOMAIN_HASH)]).then(
                        (domainTypehash) => {
                            switch (domainTypehash) {
                                case EIP_2612_DOMAIN_TYPEHASH: {
                                    return Permit.EIP_2612;
                                }
                                case UNISWAP_DOMAIN_TYPEHASH: {
                                    return Permit.UNISWAP;
                                }
                                default: {
                                    return Promise.reject(new Error(`Unsupported domain typehash: ${domainTypehash}`));
                                }
                            }
                        }
                    );
                }
                default: {
                    return Promise.reject(new Error(`Unsupported permit typehash: ${permitTypehash}`));
                }
            }
        });
    }

    /**
     * get typedData for signing
     * @param {string} permitType
     * @param {string} account
     * @param {number} chainId
     * @param {string} name
     * @param {string} nonce
     * @param {string} spenderAddress
     * @param {string} amount
     * 
     * @returns
     * @memberof ERC20
     */
    private getTypedData_(permitType: string, account: string, chainId: number, name: string, nonce: string, spenderAddress: string, amount: string) {
        const typedData = {
            types: {
                EIP712Domain: [
                    { name: 'name', type: 'string' },
                    { name: 'version', type: 'string' },
                    { name: 'chainId', type: 'uint256' },
                    { name: 'verifyingContract', type: 'address' }
                ],
                Permit: []
            },
            primaryType: "Permit",
            domain: {
                name,
                version: "1",
                chainId,
                verifyingContract: this.contractParam.address,
            },
            message: {}
        };
        switch (permitType) {
            case Permit.DAI:
                typedData.types.Permit = [
                    { name: "holder", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "nonce", type: "uint256" },
                    { name: "expiry", type: "uint256" },
                    { name: "allowed", type: "bool" },
                ];
                typedData.message = {
                    holder: account,
                    spender: spenderAddress,
                    nonce,
                    expiry: MAX_AMOUNT,
                    allowed: true,
                };
            case Permit.EIP_2612:
            case Permit.UNISWAP:

                if (permitType === Permit.UNISWAP) {
                    typedData.types.EIP712Domain = [
                        { name: 'name', type: 'string' },
                        { name: 'chainId', type: 'uint256' },
                        { name: 'verifyingContract', type: 'address' }
                    ];
                    delete typedData.domain.version;
                }
                typedData.types.Permit = [
                    { name: 'owner', type: 'address' },
                    { name: 'spender', type: 'address' },
                    { name: 'value', type: 'uint256' },
                    { name: 'nonce', type: 'uint256' },
                    { name: 'deadline', type: 'uint256' }
                ];
                typedData.message = {
                    owner: account,
                    spender: spenderAddress,
                    value: amount,
                    nonce: nonce,
                    deadline: MAX_AMOUNT,
                };
        }
        return typedData;
    }

    /**
     * get {r, s, v} from signature
     * @param {BaseWeb3Client} client
     * @param {string} signature
     * 
     * @returns
     * @memberof ERC20
     */
    private getSignatureParameters_(client: BaseWeb3Client, signature: string) {
        if (!isHexString(signature)) {
            throw new Error(
                'Given value "'.concat(signature, '" is not a valid hex string.'),
            );
        }

        if (signature.slice(0, 2) !== '0x') {
            signature = '0x'.concat(signature);
        }

        const r = signature.slice(0, 66);
        const s = '0x'.concat(signature.slice(66, 130));
        let v = client.hexToNumber('0x'.concat(signature.slice(130, 132)));
        if (![27, 28].includes(v as any)) {
            v += 27;
        }
        return {
            r: r,
            s: s,
            v: v,
        };
    }

    /**
     * encode permit function data
     * @param {BaseContract} contract
     * @param {string} permitType
     * @param {any} signatureParams
     * @param {string} spenderAddress
     * @param {string} account
     * @param {string} nonce
     * @param {string} amount
     * 
     * @returns
     * @memberof ERC20
     */
    private encodePermitFunctionData_(contract: BaseContract, permitType: string, signatureParams: any, spenderAddress: string, account: string, nonce: string, amount: string) {
        const { r, s, v } = signatureParams;
        let method: BaseContractMethod;
        switch (permitType) {
            case Permit.DAI:
                method = contract.method(
                    "permit",
                    account,
                    spenderAddress,
                    nonce,
                    MAX_AMOUNT,
                    true,
                    v,
                    r,
                    s,
                );
                break;

            case Permit.EIP_2612:
            case Permit.UNISWAP:
                method = contract.method(
                    "permit",
                    account,
                    spenderAddress,
                    amount,
                    MAX_AMOUNT,
                    v,
                    r,
                    s,
                );
                break;
        }
        return method.encodeABI();
    }

    /**
     * Get permit data for given spender for given amount
     * @param {TYPE_AMOUNT} amount
     * @param {string} spenderAddress
     * 
     * @returns
     * @memberof ERC20
     */
    private getPermitData_(amount: TYPE_AMOUNT, spenderAddress: string) {

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        const client = this.contractParam.isParent ? this.client.parent : this.client.child;
        let account: string;
        let chainId: number;
        let permitType: string;
        let contract: BaseContract;
        let nonce: string;

        return Promise.all([client.name === 'WEB3' ? client.getAccountsUsingRPC_() : client.getAccounts(), this.getContract(), client.getChainId(), this.getPermit()]).then(result => {
            account = result[0][0];
            contract = result[1];
            chainId = result[2];
            permitType = result[3];
            const nameMethod = contract.method("name");
            const nonceMethod = contract.method("nonces", account);
            return Promise.all([this.processRead<string>(nameMethod), this.processRead<string>(nonceMethod)]);
        }).then(data => {
            const name = data[0];
            nonce = data[1];
            return this.getTypedData_(permitType, account, chainId, name, nonce, spenderAddress, amountInABI);
        }).then(typedData => {
            return client.signTypedData(account, typedData);
        }).then(signature => {
            const signatureParameters = this.getSignatureParameters_(client, signature);
            return this.encodePermitFunctionData_(
                contract, permitType, signatureParameters, spenderAddress, account, nonce, amountInABI
            );
        });
    }

    /**
     * Get permit data for given amount
     * @param {TYPE_AMOUNT} amount
     * @param {IApproveTransactionOption} option
     * 
     * @returns
     * @memberof ERC20
     */
    getPermitData(amount: TYPE_AMOUNT, option: IApproveTransactionOption = {}) {
        this.checkForNonNative("getPermitData");

        const spenderAddress = option.spenderAddress ? option.spenderAddress : this.getBridgeAddress();

        return this.getPermitData_(amount, spenderAddress);
    }

}
