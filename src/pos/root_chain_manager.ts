import { BaseContract, BaseWeb3Client } from "../model";

export class RootChainManager {

    contract: BaseContract;

    constructor(private client_: BaseWeb3Client, address: string, abi) {
        this.contract = this.client_.getContract(
            address,
            abi
        );
    }

    method(methodName: string, ...args) {
        return this.contract.method(methodName, ...args);
    }
}