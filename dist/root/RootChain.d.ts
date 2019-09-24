import Contract from 'web3/eth/contract';
import ContractsBase from '../common/ContractsBase';
import { address } from '../types/Common';
import Web3Client from '../common/Web3Client';
import BN from 'bn.js';
export default class RootChain extends ContractsBase {
    rootChain: Contract;
    constructor(rootChain: address, web3Client: Web3Client);
    getLastChildBlock(): Promise<any>;
    findHeaderBlockNumber(childBlockNumber: BN | string | number): Promise<BN>;
    getRawContract(): Contract;
}
