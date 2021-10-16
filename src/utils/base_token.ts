import { Web3SideChainClient } from "./web3_side_chain_client";
import { ITransactionConfig, ITransactionOption, IContractInitParam } from "../interfaces";
import { BaseContractMethod, BaseContract, BaseWeb3Client } from "../abstracts";
import { Converter, merge } from "../utils";
import { EXTRA_GAS_FOR_PROXY_CALL } from "../constant";
import { ContractWriteResult } from "../helpers";
import { promiseResolve } from "./promise_resolve";
import { ERROR_TYPE } from "../enums";
import { TYPE_AMOUNT } from "../types";
import { ErrorHelper } from "./error_helper";

export interface ITransactionConfigParam {
    txConfig: ITransactionConfig;
    method?: BaseContractMethod;
    isWrite?: boolean;
    isParent?: boolean;
}

export class BaseToken {

    private contract_: BaseContract;

    constructor(
        protected contractParam: IContractInitParam,
        protected client: Web3SideChainClient,
    ) {
    }

    getContract(): Promise<BaseContract> {
        if (this.contract_) {
            return promiseResolve<BaseContract>(this.contract_ as any);
        }
        const contractParam = this.contractParam;
        return this.client.getABI(
            contractParam.name,
            contractParam.bridgeType,
        ).then(abi => {
            this.contract_ = this.getContract_({
                abi,
                isParent: contractParam.isParent,
                tokenAddress: contractParam.address
            });
            return this.contract_;
        });
    }

    protected processWrite(method: BaseContractMethod, option: ITransactionOption = {}): Promise<ContractWriteResult> {
        this.validateTxOption__(option);

        this.client.logger.log("process write");
        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: true,
                method,
                isParent: this.contractParam.isParent
            }).then(config => {
                this.client.logger.log("process write config");
                if (option.returnTransaction) {
                    return merge(config, {
                        data: method.encodeABI(),
                        to: method.address
                    } as ITransactionConfig);
                }
                const methodResult = method.write(
                    config,
                );
                return new ContractWriteResult(methodResult);

            });
    }

    protected sendTransaction(option: ITransactionOption = {}): Promise<ContractWriteResult> {
        this.validateTxOption__(option);

        this.client.logger.log("process write");
        const isParent = this.contractParam.isParent;
        const client = this.getClient_(isParent);
        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: true,
                method: null as any,
                isParent: this.contractParam.isParent
            }).then(config => {
                this.client.logger.log("process write config");
                if (option.returnTransaction) {
                    return config as any;
                }
                const methodResult = client.write(
                    config,
                );
                return new ContractWriteResult(methodResult);

            });
    }

    protected readTransaction(option: ITransactionOption = {}): Promise<ContractWriteResult> {
        this.validateTxOption__(option);
        this.client.logger.log("process read");
        const isParent = this.contractParam.isParent;
        const client = this.getClient_(isParent);
        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: true,
                method: null as any,
                isParent: this.contractParam.isParent
            }).then(config => {
                this.client.logger.log("process read config");
                if (option.returnTransaction) {
                    return config as any;
                }
                return client.read(
                    config,
                );
            });
    }

    private validateTxOption__(option: ITransactionOption) {
        if (typeof option !== 'object' || Array.isArray(option)) {
            new ErrorHelper(ERROR_TYPE.TransactionOptionNotObject).throw();
        }
    }

    protected processRead<T>(method: BaseContractMethod, option: ITransactionOption = {}): Promise<T> {
        this.validateTxOption__(option);
        this.client.logger.log("process read");
        return this.createTransactionConfig(
            {
                txConfig: option,
                isWrite: false,
                method,
                isParent: this.contractParam.isParent
            }).then(config => {
                this.client.logger.log("process read config");
                if (option.returnTransaction) {
                    return merge(config, {
                        data: method.encodeABI(),
                        to: this.contract_.address
                    } as ITransactionConfig);
                }
                return method.read(
                    config,
                );
            });
    }

    protected getClient_(isParent) {
        return isParent ? this.client.parent :
            this.client.child;
    }

    private getContract_({ isParent, tokenAddress, abi }) {
        const client = this.getClient_(isParent);
        return client.getContract(tokenAddress, abi);
    }

    protected get parentDefaultConfig() {
        return this.client.config.parent.defaultConfig;
    }

    protected get childDefaultConfig() {
        return this.client.config.child.defaultConfig;
    }

    protected async createTransactionConfig({ txConfig, method, isParent, isWrite }: ITransactionConfigParam) {
        const defaultConfig = isParent ? this.parentDefaultConfig : this.childDefaultConfig;
        txConfig = Object.assign(defaultConfig, (txConfig || {}));
        this.client.logger.log("txConfig", txConfig, "onRoot", isParent, "isWrite", isWrite);
        const client = isParent ? this.client.parent :
            this.client.child;
        const estimateGas = (config: ITransactionConfig) => {
            return method ? method.estimateGas(config) :
                client.estimateGas(config);
        };
        if (isWrite) {
            const [gasLimit, gasPrice, nonce, chainId] = await Promise.all([
                !(txConfig.gasLimit)
                    ? estimateGas({ from: txConfig.from, value: txConfig.value })
                    : txConfig.gasLimit,
                !txConfig.gasPrice ? client.getGasPrice() : txConfig.gasPrice,
                !txConfig.nonce ? client.getTransactionCount(txConfig.from as string, 'pending') : txConfig.nonce,
                !txConfig.chainId ? client.getChainId() : txConfig.chainId,
            ]);
            this.client.logger.log("options filled");
            txConfig.gasLimit = isParent ? Number(gasLimit) + EXTRA_GAS_FOR_PROXY_CALL : gasLimit;
            txConfig.gasPrice = gasPrice;
            txConfig.nonce = nonce;
            txConfig.chainId = chainId;
        }
        return txConfig;
    }

    protected transferERC20_(to: string, amount: TYPE_AMOUNT, option?: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "transfer",
                to,
                Converter.toHex(amount)
            );
            return this.processWrite(
                method, option
            );
        });
    }

    protected transferERC721_(from: string, to: string, tokenId: string, option: ITransactionOption) {
        return this.getContract().then(contract => {
            const method = contract.method(
                "transferFrom",
                from,
                to,
                tokenId
            );
            return this.processWrite(
                method, option
            );
        });
    }

    protected checkForRoot_(methodName) {
        if (!this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.AllowedOnRoot, methodName).throw();
        }
    }

    protected checkForChild_(methodName) {
        if (this.contractParam.isParent) {
            this.client.logger.error(ERROR_TYPE.AllowedOnChild, "withdrawStart").throw();
        }
    }

}