import { IPlugin } from "../interfaces";
import { defaultExport } from "../default";

export const use = (plugin, ...payload) => {
    const pluginInstance: IPlugin = typeof plugin === "function" ? new plugin() : plugin;
    return pluginInstance.setup(defaultExport, ...payload);
};