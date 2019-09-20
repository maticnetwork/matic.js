import Web3 from 'web3';
import Contract from 'web3/eth/contract';
import { address, SendOptions } from '../types/Common';
import BN from 'bn.js';
export default class DepositManager {
    depositManagerContract: Contract;
    private _defaultOptions;
    constructor(depositManagerContractAddress: address, _parentWeb3: Web3, _defaultOptions?: SendOptions);
    depositERC20(token: address, amount: BN | string, options?: SendOptions): Promise<any>;
    depositERC721(token: address, tokenId: string, options?: SendOptions): Promise<any>;
    depositBulk(tokens: address[], amountOrTokenIds: string[], user: address, options?: SendOptions): Promise<any>;
    depositERC20ForUser(token: address, amount: string, user: address, options?: SendOptions): Promise<any>;
    depositERC721ForUser(token: address, tokenId: string, user: address, options?: SendOptions): Promise<any>;
    depositEther(amount: string, options?: SendOptions): Promise<any>;
    getAddress(): string;
    setDefaultOptions(_defaultOptions: SendOptions): void;
    private encode;
    private _send;
}
