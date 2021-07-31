export interface IPlasmaClientConfig {
    network: string;
    version: string;
    parent: {
        provider: any;
    };
    child: {
        provider: any;
    };
    depositManager?: string;
}