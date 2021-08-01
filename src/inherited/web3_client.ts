import { BaseContract, BaseWeb3Client } from "../model";
import { Web3Contract } from "./eth_contract";
import Web3 from "web3";
import { ITransactionConfig } from "../interfaces";

export class MaticWeb3Client extends BaseWeb3Client {
    private web3_: Web3;

    constructor(provider: any) {
        super(provider);
        this.web3_ = new Web3(provider);
    }

    read(config: ITransactionConfig) {
        return this.web3_.eth.call(config);
    }

    write(config: ITransactionConfig) {
        return this.web3_.eth.sendTransaction(config);
    }

    getContract(address: string, abi: any) {
        const cont = new this.web3_.eth.Contract(abi, address);
        return new Web3Contract(address, cont as any);
    }

    getGasPrice() {
        return this.web3_.eth.getGasPrice();
    }

    getTransactionCount(address: string, blockNumber: any) {
        return this.web3_.eth.getTransactionCount(address, blockNumber);
    }

    getChainId() {
        return this.web3_.eth.net.getId();
    }
}