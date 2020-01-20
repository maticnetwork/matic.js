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
    burnERC721Token(token: address, tokenId: BN | string, options?: SendOptions): Promise<any>;
    processExits(token: address, options?: SendOptions): Promise<any>;
    startExitWithBurntERC20Tokens(burnTxHash: any, options?: any): Promise<any>;
    startExitWithBurntERC721Tokens(burnTxHash: any, options?: any): Promise<any>;
    /**
     * Start an exit for a token that was minted and burnt on the side chain
     * Wrapper over contract call: [MintableERC721Predicate.startExitForMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31)
     * @param burnTxHash Hash of the burn transaction on Matic
     * @param predicate address of MintableERC721Predicate
     */
    startExitForMintableBurntToken(burnTxHash: any, predicate: address, options?: any): Promise<any>;
    /**
     * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
     * Wrapper over contract call: [MintableERC721Predicate.startExitForMetadataMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66)
     * @param burnTxHash Hash of the burn transaction on Matic
     * @param predicate address of MintableERC721Predicate
     */
    startExitForMetadataMintableBurntToken(burnTxHash: any, predicate: address, options?: any): Promise<any>;
    private _buildPayloadAndFindMintTransaction;
    private _buildPayloadForExit;
    private _encodePayload;
}
