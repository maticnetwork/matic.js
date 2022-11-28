import utils from 'ethereumjs-util';
import { ITransactionOption } from "../interfaces";
import { Converter, Web3SideChainClient } from "../utils";
import { HermezToken } from "./hermez_token";
import { TYPE_AMOUNT } from "../types";
import { BaseContractMethod } from "../abstracts";
import { MAX_AMOUNT, NULL_ADDRESS, DAI_PERMIT_TYPEHASH, EIP_2612_PERMIT_TYPEHASH, UNISWAP_DOMAIN_TYPEHASH, EIP_2612_DOMAIN_TYPEHASH, Permit, BaseContract } from "..";
import { IAllowanceTransactionOption, IApproveTransactionOption, IBridgeTransactionOption, IHermezClientConfig, IHermezContracts } from "../interfaces";

export class ERC20 extends HermezToken {

    constructor(
        tokenAddress: string,
        isParent: boolean,
        client: Web3SideChainClient<IHermezClientConfig>,
        getContracts: () => IHermezContracts
    ) {
        super({
            isParent,
            address: tokenAddress,
            name: 'ChildERC20',
            bridgeType: 'hermez'
        }, client, getContracts);
    }

    getBalance(userAddress: string, option?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "balanceOf",
                userAddress
            );
            return this.processRead<string>(method, option);
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
        const spenderAddress = option.spenderAddress ? option.spenderAddress : (
            this.contractParam.isParent ? this.parentBridge.contractAddress : this.childBridge.contractAddress);

        return this.getContract().then(contract => {
            const method = contract.method(
                "allowance",
                userAddress,
                spenderAddress,
            );
            return this.processRead<string>(method, option);
        });
    }

    approve(amount: TYPE_AMOUNT, option: IApproveTransactionOption = {}) {
        const spenderAddress = option.spenderAddress ? option.spenderAddress : (
            this.contractParam.isParent ? this.parentBridge.contractAddress : this.childBridge.contractAddress);

        return this.getContract().then(contract => {
            const method = contract.method(
                "approve",
                spenderAddress,
                Converter.toHex(amount)
            );
            return this.processWrite(method, option);
        });
    }

    approveMax(option: IApproveTransactionOption = {}) {
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
    deposit(amount: TYPE_AMOUNT, userAddress: string, option?: IBridgeTransactionOption) {
        this.checkForRoot("deposit");
        const permitData = option.permitData || '0x';

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        return this.childBridge.networkID().then(networkId => {
            return this.parentBridge.bridgeAsset(
                this.contractParam.address,
                networkId,
                userAddress,
                amountInABI,
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
    depositWithPermit(amount: TYPE_AMOUNT, userAddress: string, option?: IBridgeTransactionOption) {
        this.checkForRoot("deposit");

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        return this.getPermitData().then(permitData => {
            return this.childBridge.networkID().then(networkId => {
                return this.parentBridge.bridgeAsset(
                    this.contractParam.address,
                    networkId,
                    userAddress,
                    amountInABI,
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
    withdraw(amount: TYPE_AMOUNT, userAddress: string, option?: IBridgeTransactionOption) {
        this.checkForChild("withdraw");
        const permitData = option.permitData || '0x';

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        return this.parentBridge.networkID().then(networkId => {
            return this.childBridge.bridgeAsset(
                this.contractParam.address,
                networkId,
                userAddress,
                amountInABI,
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
    withdrawWithPermit(amount: TYPE_AMOUNT, userAddress: string, option?: IBridgeTransactionOption) {
        this.checkForChild("withdraw");

        const amountInABI = this.client.parent.encodeParameters(
            [Converter.toHex(amount)],
            ['uint256'],
        );

        return this.getPermitData().then(permitData => {
            return this.parentBridge.networkID().then(networkId => {
                return this.childBridge.bridgeAsset(
                    this.contractParam.address,
                    networkId,
                    userAddress,
                    amountInABI,
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
    transfer(amount: TYPE_AMOUNT, to: string, option?: ITransactionOption) {
        return this.transferERC20(to, amount, option);
    }

    getPermitData(option: IApproveTransactionOption = {}) {
        const spenderAddress = option.spenderAddress ? option.spenderAddress : (
            this.contractParam.isParent ? this.parentBridge.contractAddress : this.childBridge.contractAddress);

        return this.getPermitData_(spenderAddress);
    }

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
                    return Promise.any([this.processRead<string>(DOMAIN_TYPEHASH), this.processRead<string>(EIP712DOMAIN_HASH)]).then(
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

    private getTypedData_(permitType: string, account: string, chainId: number, name: string, nonce: string, spenderAddress: string) {
        const typedData = {
            types: {
                EIP712Domain: [
                    {
                        name: 'name',
                        type: 'string',
                    },
                    {
                        name: 'version',
                        type: 'string',
                    },
                    {
                        name: 'verifyingContract',
                        type: 'address',
                    },
                    {
                        name: 'salt',
                        type: 'bytes32',
                    },
                ],
                Permit: []
            },
            primaryType: "Permit",
            domain: {
                name,
                version: '1',
                verifyingContract: this.contractAddress,
                salt: Converter.toBytes(chainId)
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
                typedData.types.Permit = [
                    { name: "owner", type: "address" },
                    { name: "spender", type: "address" },
                    { name: "value", type: "uint256" },
                    { name: "nonce", type: "uint256" },
                    { name: "deadline", type: "uint256" },
                ];
                typedData.message = {
                    owner: account,
                    spender: spenderAddress,
                    value: MAX_AMOUNT,
                    nonce,
                    deadline: MAX_AMOUNT,
                };
        }
        return typedData;
    }

    private getSignatureParameters_(signature: string) {
        if (!utils.isHexString(signature)) {
            throw new Error(
                'Given value "'.concat(signature, '" is not a valid hex string.'),
            );
        }

        if (signature.slice(0, 2) !== '0x') {
            signature = '0x'.concat(signature);
        }

        const r = signature.slice(0, 66);
        const s = '0x'.concat(signature.slice(66, 130));
        let v = Converter.hexToNumber('0x'.concat(signature.slice(130, 132)));
        if (![27, 28].includes(v as any)) {
            v += 27;
        }
        return {
            r: r,
            s: s,
            v: v,
        };
    }

    private encodePermitFunctionData_(contract: BaseContract, permitType: string, signatureParams: any, spenderAddress: string, account: string) {
        const { r, s, v } = signatureParams;
        let method: BaseContractMethod;
        switch (permitType) {
            case Permit.DAI:
                method = contract.method(
                    "permit",
                    account,
                    spenderAddress,
                    MAX_AMOUNT,
                    1,
                    v,
                    r,
                    s,
                );

            case Permit.EIP_2612:
            case Permit.UNISWAP:
                method = contract.method(
                    "permit",
                    account,
                    spenderAddress,
                    MAX_AMOUNT,
                    1,
                    v,
                    r,
                    s,
                );
        }
        return method.encodeABI();
    }

    private getPermitData_(spenderAddress: string) {
        if (this.contractParam.address === NULL_ADDRESS) {
            throw Error("Native currency does't require permit");
        }

        const client = this.contractParam.isParent ? this.client.parent : this.client.child;
        let account: string;
        let chainId: number;
        let permitType: string;
        let contract: BaseContract;
        return Promise.all([client.getAccounts(), this.getContract(), client.getChainId(), this.getPermit()]).then(result => {
            account = result[0][0];
            contract = result[1];
            chainId = result[2];
            permitType = result[3];
            const nameMethod = contract.method("name");
            const nonceMethod = contract.method("nonce", account);
            return Promise.all([this.processRead<string>(nameMethod), this.processRead<string>(nonceMethod)]);
        }).then(data => {
            const name = data[0];
            const nonce = data[1];
            return this.getTypedData_(permitType, account, chainId, name, nonce, spenderAddress);
        }).then(typedData => {
            return client.signTypedData(account, JSON.stringify(typedData));
        }).then(signature => {
            const signatureParameters = this.getSignatureParameters_(signature);
            return this.encodePermitFunctionData_(
                contract, permitType, signatureParameters, spenderAddress, account
            );
        });
    }

}
