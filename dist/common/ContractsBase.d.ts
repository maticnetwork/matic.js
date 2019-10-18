import Web3Client from './Web3Client';
import BN from 'bn.js';
export default class ContractsBase {
    web3Client: Web3Client;
    constructor(web3Client: Web3Client);
    encode(number: BN | string): string;
}
