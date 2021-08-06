export interface IPOSClientConfig {
    network: string;
    version: string;
    parent: {
        provider: any;
        defaultConfig: {
            from: string;
        }
    };
    child: {
        provider: any;
        defaultConfig: {
            from: string;
        }
    };
    rootChainManager?: string;
    log?: boolean;
}