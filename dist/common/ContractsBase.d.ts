import Web3Client from './Web3Client';
import BN from 'bn.js';
import { address } from '../types/Common';
export default class ContractsBase {
    web3Client: Web3Client;
    constructor(web3Client: Web3Client);
    encode(number: BN | string | number): string;
    getERC20TokenContract(token: address, parent?: boolean): import("web3/eth/contract").default;
    getERC721TokenContract(token: address, parent?: boolean): import("web3/eth/contract").default;
    _fillOptions(options: any, txObject: any, web3: any): Promise<{
        from: any;
        gas: string;
        gasPrice: string;
        nonce: any;
        chainId: any;
        value: any;
        to: any;
        data: any;
    }>;
    wrapWeb3Promise(promise: any, options: any): any;
}
