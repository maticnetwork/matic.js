import BN from 'bn.js';
import Contract from 'web3/eth/contract';
import ContractsBase from '../common/ContractsBase';
import { address, SendOptions } from '../types/Common';
import Web3Client from '../common/Web3Client';
export default class DepositManager extends ContractsBase {
    depositManagerContract: Contract;
    constructor(depositManager: address, web3Client: Web3Client);
    approveERC20(token: address, amount: BN | string, options?: SendOptions): Promise<any>;
    depositERC20(token: address, amount: BN | string, options?: SendOptions): Promise<any>;
    depositERC721(token: address, tokenId: string, options?: SendOptions): Promise<any>;
    depositBulk(tokens: address[], amountOrTokenIds: string[], user: address, options?: SendOptions): Promise<any>;
    depositERC20ForUser(token: address, amount: BN | string, user: address, options?: SendOptions): Promise<any>;
    depositERC721ForUser(token: address, tokenId: string, user: address, options?: SendOptions): Promise<any>;
    depositEther(amount: string, options?: SendOptions): Promise<any>;
    getAddress(): string;
}
