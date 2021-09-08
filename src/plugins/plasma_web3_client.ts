import { ITransactionConfig, IPlugin, ITransactionResult } from "../interfaces";
import { defaultExport } from "../default";
import { MaticWeb3Client } from "../web3js";


export class Web3Plugin implements IPlugin {
    setup(matic: typeof defaultExport) {
        matic.Web3Client = MaticWeb3Client;
    }
}