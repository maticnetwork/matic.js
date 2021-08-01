import { ITransactionConfig, IPlugin, ITransactionResult } from "../interfaces";
import { defaultExport } from "../default";
import { MaticWeb3Client } from "../inherited";


export class Web3Plugin implements IPlugin {
    setup(matic: typeof defaultExport) {
        matic.Web3Client = MaticWeb3Client;
    }
}