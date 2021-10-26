import { setWeb3Client, getWeb3Client } from "./constant";
import { POSClient } from "./pos";
import { use } from "./utils";
import { BaseWeb3Client } from "./abstracts";

export const defaultExport = {
    set Web3Client(client: typeof BaseWeb3Client) {
        setWeb3Client(client);
    },
    get Web3Client() {
        return getWeb3Client();
    },
    use,
    POSClient,
}