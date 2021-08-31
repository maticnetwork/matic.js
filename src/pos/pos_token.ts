import { BaseToken, Web3SideChainClient } from "../model";
import { ITransactionOption, IContractInitParam } from "../interfaces";
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
            return this.predicateAddress;
        }
        const tokenType = await this.rootChainManager.method("tokenToType", this.contractParam.tokenAddress).read();
        if (!tokenType) {
            throw new Error('Invalid Token Type');
        }
        const predicateAddress = await this.rootChainManager.method
            (
                "typeToPredicate", tokenType
            ).read<string>();
        this.predicateAddress = predicateAddress;
        return predicateAddress;
    }
}