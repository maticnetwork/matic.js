export interface IClientOption {
    network: string;
    version: string;
    parent: {
        provider: any;
    };
    child: {
        provider: any;
    };
}