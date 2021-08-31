import { BaseWeb3Client, BaseContract } from "../abstracts";

export class DepositManager {
    contract: BaseContract;

    constructor(private client_: BaseWeb3Client, address: string, abi) {
        this.contract = this.client_.getContract(
            address,
            abi
        );
    }

}