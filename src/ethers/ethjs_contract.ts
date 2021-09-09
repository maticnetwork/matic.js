import { BaseContract } from "../abstracts";
import { Contract } from "ethers";
import { ContractMethod } from "./ethjs_method";

export class EthJsContract extends BaseContract {

    contract: Contract;

    constructor(address: string, contract: Contract, logger) {
        super(address, logger);
        this.contract = contract;
    }

    method(methodName: string, ...args) {
        this.logger.log("args method", arguments);
        return new ContractMethod(
            this.logger, this.contract, methodName, args
        );
    }
}