import Web3 from 'web3';
import { SendOptions } from '../types/Common';
export default class Web3Client {
    parentWeb3: Web3;
    web3: Web3;
    parentDefaultOptions: SendOptions;
    maticDefaultOptions: SendOptions;
    constructor(parentProvider: any, maticProvider: any, parentDefaultOptions: any, maticDefaultOptions: any);
    set wallet(_wallet: any);
    call(method: any, options?: SendOptions): Promise<any>;
    _fillOptions(options: any, txObject: any, web3: any): Promise<Error | {
        from: any;
        gas: any;
        gasLimit: any;
        gasPrice: any;
        nonce: any;
        chainId: any;
        value: any;
        to: any;
        data: any;
    }>;
    wrapWeb3Promise(promise: any, options: any): any;
    callOnMatic(method: any, options?: any): Promise<any>;
    sendOnMatic(method: any, options?: any): Promise<any>;
    send(txObject: any, options?: any): Promise<any>;
    getParentWeb3(): Web3;
    getMaticWeb3(): Web3;
    setParentDefaultOptions(options: any): void;
    setMaticDefaultOptions(options: any): void;
    setParentProvider(provider: any): void;
}
