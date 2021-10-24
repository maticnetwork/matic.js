import { BaseToken, Web3SideChainClient, promiseResolve } from "../utils";
import { IContractInitParam, IPOSClientConfig } from "../interfaces";
import { IPOSContracts } from "../interfaces";

export class POSToken extends BaseToken<IPOSClientConfig> {

    private predicateAddress: string;

    constructor(
        contractParam: IContractInitParam,
        client: Web3SideChainClient<IPOSClientConfig>,
        protected getPOSContracts: () => IPOSContracts
    ) {
        super(contractParam, client);
    }

    get rootChainManager() {
        return this.getPOSContracts().rootChainManager;
    }

    get exitUtil() {
        return this.getPOSContracts().exitUtil;
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