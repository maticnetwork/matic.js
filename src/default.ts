import { BaseWeb3Client } from "@/model";
import { setWeb3Client } from "@/constant";
import { IPlugin } from "@/interfaces";
import { PlasmaClient } from "@/plasma";
import { POSClient } from "@/pos";
import { Web3Plugin } from "@/plugins/plasma_web3_client";

export const defaultExport = {
    set Web3Client(client: typeof BaseWeb3Client) {
        setWeb3Client(client);
    },
    use(plugin, ...payload) {
        const pluginInstance: IPlugin = typeof plugin === "function" ? new plugin() : plugin;
        return pluginInstance.setup(defaultExport, ...payload);
    },
    PlasmaClient: PlasmaClient,
    POSClient: POSClient,
    Web3Plugin: Web3Plugin
}