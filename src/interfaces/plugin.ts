import { defaultExport } from "../default";

export interface IPlugin {
    setup(matic: typeof defaultExport, ...payload);
}