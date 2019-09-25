import Contract from 'web3/eth/contract';
import { address, SendOptions } from '../types/Common';
import BN from 'bn.js';
import Web3Client from '../common/Web3Client';
import ContractsBase from '../common/ContractsBase';
import RootChain from './RootChain';
import Registry from './Registry';
export default class WithdrawManager extends ContractsBase {
    withdrawManager: Contract;
    erc20Predicate: Contract;
    private rootChain;
    private registry;
    constructor(withdrawManager: address, rootChain: RootChain, web3Client: Web3Client, registry: Registry);
    initialize(): Promise<void>;
    burnERC20Tokens(token: address, amount: BN | string, options?: SendOptions): Promise<any>;
    startExitWithBurntERC20Tokens(burnERC20TxHash: any, options?: any): Promise<any>;
    processExits(token: address, options?: SendOptions): Promise<any>;
    private _buildPayloadForExit;
    private _getERC20TokenContract;
}
