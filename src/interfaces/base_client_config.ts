export interface IBaseClientConfig {
    network: string;
    version: string;
    parent?: {
        provider: any;
        defaultConfig: {
            from: string;
        }
    };
    child?: {
        provider: any;
        defaultConfig: {
            from: string;
        }
    };
    log?: boolean;
    requestConcurrency?: number;

}
