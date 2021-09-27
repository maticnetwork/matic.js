import { BaseWeb3Client } from "../abstracts";
import { providers, Wallet, utils, Contract } from "ethers";
import { IJsonRpcRequestPayload, ITransactionConfig, ITransactionWriteResult } from "../interfaces";
import { EthJsContract } from "./ethjs_contract";
import { doNothing } from "../helpers";

type ETHER_PROVIDER = providers.JsonRpcProvider;
type ETHER_SIGNER = providers.JsonRpcSigner;

export class EtherWeb3Client extends BaseWeb3Client {

    provider: ETHER_PROVIDER;
    signer: ETHER_SIGNER;

    constructor(provider: ETHER_PROVIDER | Wallet, logger) {
        super(logger);
        if ((provider as ETHER_PROVIDER)._isProvider) {
            this.provider = provider as ETHER_PROVIDER;
            this.signer = this.provider.getSigner();
        }
        else {
            this.signer = (provider as any);
            this.provider = ((provider as Wallet).provider) as any;
        }
    }



    getBlock(blockHashOrBlockNumber) {
        return this.provider.getBlock(blockHashOrBlockNumber).then(block => {
            return block as any;
        });
    }

    getBlockWithTransaction(blockHashOrBlockNumber) {
        return this.provider.getBlockWithTransactions(blockHashOrBlockNumber).then(block => {
            return block as any;
        });
    }


    getChainId() {
        return this.signer.getChainId();
    }

    getTransaction(transactionHash: string) {
        return this.provider.getTransaction(transactionHash).then(result => {
            return result as any;
        });
    }

    getTransactionCount(address: string, blockNumber: any) {
        return this.provider.getTransactionCount(address, blockNumber);
    }

    getTransactionReceipt(transactionHash: string) {
        return this.provider.getTransactionReceipt(transactionHash).then(result => {
            return result as any;
        });
    }

    getGasPrice() {
        return this.provider.getGasPrice().then(result => {
            return result.toString();
        });
    }

    estimateGas(config) {
        return this.provider.estimateGas(
            this.toTransactionRequest_(config)
        ).then(value => {
            return value.toNumber();
        });
    }

    encodeParameters(params: any[], types: any[]) {
        return utils.defaultAbiCoder.encode(types, params);
    }

    etheriumSha3(...value) {
        return utils.keccak256(value);
    }

    sendRPCRequest(request: IJsonRpcRequestPayload) {
        return this.provider.send(request.method, request.params);
    }

    private toTransactionRequest_(config: ITransactionConfig) {
        return {
            chainId: config.chainId,
            data: config.data,
            from: config.from as any,
            gasLimit: config.gasLimit,
            gasPrice: config.gasPrice as any,
            nonce: config.nonce,
            to: config.to,
            value: config.value as any
        };
    }

    write(config: ITransactionConfig) {
        const result = {
            onTransactionHash: (doNothing as any),
            onReceipt: doNothing,
            onReceiptError: doNothing,
            onTxError: doNothing
        } as ITransactionWriteResult;
        this.signer.sendTransaction(
            this.toTransactionRequest_(config)
        ).then(response => {
            result.onTransactionHash(response.hash);
            return response.wait();
        }).then(receipt => {
            result.onReceipt(receipt);
        }).catch(err => {
            console.log("error", err);
            result.onTxError(err);
            result.onReceiptError(err);
        });
        return result;
    }

    read(config: ITransactionConfig) {
        return this.signer.call(
            this.toTransactionRequest_(config)
        );
    }

    getContract(address: string, abi: any) {
        return new EthJsContract(
            address,
            new Contract(address, abi, this.signer),
            this.logger
        );
    }
}