export declare type address = string;
export declare interface SendOptions {
    from?: string;
    value?: string | number;
    gas?: string | number;
    gasPrice?: string | number;
    encodeAbi?: boolean;
    parent?: boolean;
}
