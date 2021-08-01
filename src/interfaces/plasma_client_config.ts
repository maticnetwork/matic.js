export interface IPlasmaClientConfig {
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
    depositManager?: string;
    log?: boolean;
}