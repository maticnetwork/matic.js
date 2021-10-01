import { BaseToken, Web3SideChainClient, promiseResolve } from "../utils";
import { IContractInitParam } from "../interfaces";
import { RootChainManager } from "./root_chain_manager";
import { ExitManager } from "./exit_manager";

export class POSToken extends BaseToken {

    private predicateAddress: string;

    constructor(
        contractParam: IContractInitParam,
        client: Web3SideChainClient,
        protected rootChainManager: RootChainManager,
        protected exitManager: ExitManager
    ) {
        super(contractParam, client);
    }

    async getPredicateAddress() {
        if (this.predicateAddress) {
            return promiseResolve(this.predicateAddress);
        }
        const method = await this.rootChainManager.method("tokenToType", this.contractParam.address);
        const tokenType = await method.read();
        if (!tokenType) {
            throw new Error('Invalid Token Type');
        }
        const typeToPredicateMethod = await this.rootChainManager.method
            (
                "typeToPredicate", tokenType
            );
        const predicateAddress = await typeToPredicateMethod.read<string>();
        this.predicateAddress = predicateAddress;
        return predicateAddress;
    }
}