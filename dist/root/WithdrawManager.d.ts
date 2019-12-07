import Contract from 'web3/eth/contract';
import BN from 'bn.js';
import { address, SendOptions } from '../types/Common';
import Web3Client from '../common/Web3Client';
import ContractsBase from '../common/ContractsBase';
import RootChain from './RootChain';
import Registry from './Registry';
export default class WithdrawManager extends ContractsBase {
    static WITHDRAW_EVENT_SIG: string;
    withdrawManager: Contract;
    erc20Predicate: Contract;
    erc721Predicate: Contract;
    private rootChain;
    private registry;
    constructor(withdrawManager: address, rootChain: RootChain, web3Client: Web3Client, registry: Registry);
    initialize(): Promise<void>;
    burnERC20Tokens(token: address, amount: BN | string, options?: SendOptions): Promise<any>;
    burnERC721Token(token: address, tokenId: BN | string, options?: SendOptions): any;
    processExits(token: address, options?: SendOptions): Promise<any>;
    startExitWithBurntERC20Tokens(burnTxHash: any, options?: any): Promise<any>;
    startExitForMintWithTokenURITokens(burnERC20TxHash: any, options?: any): Promise<any>;
    startBulkExitForMintWithTokenURITokens(burnTxs: any, options?: any): Promise<any>;
    private _startExitForMintWithTokenURITokens;
    private _buildPayloadForExit;
    private _encodePayload;
}
