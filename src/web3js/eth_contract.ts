import { BaseContract } from "../abstracts";
import Contract from "web3/eth/contract";
import { EthMethod } from "./eth_method";

export class Web3Contract extends BaseContract {
    contract: Contract;

    constructor(address: string, contract: Contract) {
        super(address);
        this.contract = contract;
    }

    method(methodName: string, ...args) {
        console.log("args method", arguments);
        return new EthMethod(
            this.contract.methods[methodName](...args)
        );
    }
}