import { Account, Provider, Eth, Tx, TransactionReceipt, Transaction, PromiEvent } from 'web3/types';
import Web3 from 'web3';

// These types are declared to help you keep track of similar data
export type UserMaticAddress = string;
export type UserEthAddress = string;
export type RootTokenAddress = string;
export type ERC20TokenAddress = string;
export type ERC721TokenAddress = string;
export type EthContractAddress = string;
export type MaticWethAddress = string;
export type TokenAmount = string;
export type WeiAmount = string;
export type TokenId = string;
export type MaticChainTransactionId = string;

/**
 * * `from` must be valid account address(required)
 * * `gasPrice` same as Ethereum sendTransaction
 * * `gasLimit` same as Ethereum sendTransaction
 * * `nonce` same as Ethereum sendTransaction
 * * `nonce` same as Ethereum sendTransaction
 * * `value` contains ETH value. Same as Ethereum sendTransaction.
 * * `onTransactionHash` must be function. This function will be called when transaction will be broadcasted.
 * * `onReceipt` must be function. This function will be called when transaction will be included in block (when transaction gets confirmed)
 * * `onError` must be function. This function will be called when sending transaction fails.
 */
export interface TxOptions extends Tx {
    onTransactionHash?(receipt: string): void;
    onReceipt?(receipt: TransactionReceipt): void;
    onError?(error: Error): void;
}

export interface BlockHeader {
    id: number;
    number: number;
    start: number;
    end: number;
    proposer: UserMaticAddress;
    root: string;
    createdAt: string;
    updatedAt: string;
}

export interface MaticConstructor {
    /**
     * Can be a string or a Web3.providers instance. This provider must connect
     * to Matic chain. Value can be anyone of following:
     * * `'https://testnet2.matic.network'`
     * * `new Web3.providers.HttpProvider('http://localhost:8545')`
     * * WalletConnect Provider instance (See https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
     */
    maticProvider: string | Provider;

    /**
     * Can be a string or a Web3.providers instance. This provider must connect 
     * to Ethereum chain (testnet or mainchain). Value can be anyone of following:
     * * `'https://testnet2.matic.network'`
     * * `new Web3.providers.HttpProvider('http://localhost:8545')`
     * * WalletConnect Provider instance (See https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
     */
    parentProvider: string | Provider;

    /**
     * Must be valid API host. MaticSDK uses this value to fetch receipt/tx 
     * proofs instead of getting whole block to client side.
     */
    syncerUrl: string;

    /**
     * Must be valid API host. MaticSDK uses this value to fetch headerBlock info 
     * from mainchain and to find appropriate headerBlock for given blockNumber.
     */
    watcherUrl: string;

    /** Must be valid Ethereum contract address. */
    rootChainAddress: EthContractAddress;

    /** Must be valid Ethereum contract address. */
    maticWethAddress: MaticWethAddress;

    /** Must be valid Ethereum contract address. */
    withdrawManagerAddress?: EthContractAddress;

    /** Must be valid Ethereum contract address. */
    depositManagerAddress?: EthContractAddress;
}

export default class Matic {
    /**
     * Create Matic SDK instance with the given options
     * @param options 
     */
    constructor(options: MaticConstructor);
    web3: Web3;
    parentWeb3: Web3;
    wallet: Account; 
    walletAddress: UserMaticAddress;

    /**
     * Set wallet.
     * Warning: Not safe!
     * Use metamask provider or use WalletConnect provider instead.
     * @param privateKey Wallet private key
     */
    setWallet(privateKey: string): void;

    /**
     * Get matic token address mapped with mainchain token address.
     * @param address Must be a valid token address
     * @returns Matic address
     */
    getMappedTokenAddress(address: ERC20TokenAddress): Promise<UserMaticAddress>;

    /**
     * Get balance of ERC721 token for address.
     * @param address Must be a valid user address
     * @param token Must be a valid token address
     * @param options (optional) See `TxOptions`. For balance on Main chain, use `parent: true`.
     * @returns Balance
     */
    balanceOfERC721(address: UserEthAddress, token: ERC20TokenAddress, options?: TxOptions): Promise<TokenAmount>;

    /**
     * Get balance of ERC20 token for address.
     * @param address Must be a valid user address
     * @param token Must be a valid token address
     * @param options (optional) See `TxOptions`. For balance on Main chain, use `parent: true`.
     * @returns Balance
     */
    balanceOfERC20(address: UserEthAddress, token: ERC20TokenAddress, options?: TxOptions): Promise<TokenAmount>;

    /**
     * Get ERC721 tokenId at `index` for `token` and `address`.
     * @param address Must be a valid user address
     * @param token Must be a valid token address
     * @param index Index of `tokenId`
     * @param options Matic `tokenId`
     * @returns Matic tokenId
     */
    tokenOfOwnerByIndexERC721(address: UserEthAddress, token: ERC721TokenAddress, index: number, options?: Tx): TokenId;

    /**
     * Deposit ethers of the given amount
     * @param options See `TxOptions`
     * * `value`: Amount of ethers
     * * `from`: Must be a valid account address (required)
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    depositEthers(options?: TxOptions): PromiEvent<any>;

    /**
     * Approves given `amount` of `token` to `rootChainContract`.
     * @param token Must be a valid token address
     * @param amount Token amount in wei
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    approveERC20TokensForDeposit(token: ERC20TokenAddress, amount: WeiAmount, options?: TxOptions): PromiEvent<any>; // ! need to figure out return type of PromiEvent
    
    /**
     * Deposits given `amount` of `token` to `rootChainContract`.
     * @param token Must be a valid token address
     * @param user Must be a valid user address
     * @param amount Token amount in wei
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    depositERC20Tokens(token: ERC20TokenAddress, user: UserEthAddress, amount: WeiAmount, options?: TxOptions): PromiEvent<any>;

    /**
     * Deposit given `tokenId` of `token` 
     * @param token Must be a valid token address
     * @param tokenId tokenId to deposit
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    safeDepositERC20Tokens(token: ERC20TokenAddress, tokenId: TokenId, options?: TxOptions): PromiEvent<any>;

    /**
     * Approves given `amount` of `token` to `rootChainContract`.
     * @param token Must be a valid token address
     * @param amount Token amount in wei
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    approveERC721TokenForDeposit(token: ERC721TokenAddress, tokenId: TokenId, options?: TxOptions): PromiEvent<any>;

    /**
     * Deposits given `amount` of `token` to `rootChainContract`.
     * @param token Must be a valid token address
     * @param user Must be a valid user address
     * @param amount Token amount in wei
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    depositERC721Tokens(token: ERC721TokenAddress, user: UserEthAddress, tokenId: TokenId, options?: TxOptions): PromiEvent<any>; 

    /**
     * Deposit given `tokenId` of `token` 
     * @param token Must be a valid token address
     * @param tokenId tokenId to deposit
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    safeDepositERC20Tokens(token: ERC20TokenAddress, tokenId: TokenId, options?: TxOptions): PromiEvent<any>;

    /**
     * Transfer the given `amount` of `token` to `user`.
     * @param token Must be a valid ERC20 token address
     * @param user Must be a valid user address
     * @param amount Token amount in wei
     * @param options See `TxOptions`. For transfer on Main chain, use `parent: true`.
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    transferTokens(token: ERC20TokenAddress, user: UserEthAddress, amount: WeiAmount, options?: TxOptions): PromiEvent<any>;

    /**
     * Transfer the given `amount` of `token` to `user`.
     * @param token Must be a valid ERC721 token address
     * @param user Must be a valid user address
     * @param amount Token amount in wei
     * @param options See `TxOptions`. For transfer on Main chain, use `parent: true`.
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    transferERC721Tokens(token: ERC721TokenAddress, user: UserEthAddress, tokenId: TokenId, options?: TxOptions): PromiEvent<any>;

    /**
     * Transfer the given `amount` of ethers to `user`
     * @param user Must be a valid user address
     * @param amount Ether amount in wei
     * @param options See `TxOptions`. 
     * * For transfer on Main chain, use `parent: true`.
     * * For custom ether transfer on Matic Chain, `use isCustomEth: true`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    transferEthers(user: UserEthAddress, amount: WeiAmount, options?: TxOptions): PromiEvent<any>; // ! 'user' is called 'to' in index.js, inconsistent

    /**
     * Start withdraw process with given `amount` for `token`.
     * @param token Must be a valid ERC20 token address
     * @param amount Token amount in wei
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    startWithdraw(token: ERC20TokenAddress, amount: WeiAmount, options?: TxOptions): PromiEvent<any>;

    /**
     * Start withdraw process with given `amount` for `token`.
     * @param token Must be a valid ERC721 token address
     * @param amount Token amount in wei
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    startERC721Withdraw(token: ERC721TokenAddress, tokenId: TokenId, options?: TxOptions): PromiEvent<any>;

    /**
     * Get transaction object using `txId` from Matic chain.
     * @param txId Transaction Id
     * @returns A promise which will be fulfilled when the transaction is found
     */
    getTx(txId: MaticChainTransactionId): Promise<Transaction>;

    /**
     * Get transaction object using `txId` from Matic chain.
     * @param txId Transaction Id
     * @returns A promise which will be fulfilled when the transaction receipt is found
     */
    getReceipt(txId: MaticChainTransactionId): Promise<TransactionReceipt>; 

    /**
     * Fetch header/checkpoint corresponding to `blockNumber`
     * @param blockNumber Must be valid Matic sidechain block number
     * @returns A promise which will be fulfilled when the header/checkpoint corresponding to the given `blockNumber` is found.
     */
    getHeaderObject(blockNumber: number): Promise<BlockHeader>;

    /**
     * Call processExits after completion of challenge period, after that withdrawn funds get transfered to your account on mainchain
     * @param rootTokenAddress RootToken address
     * @param options See `TxOptions`
     * @returns A promise which will be fulfilled when transaction is confirmed (when receipt is generated)
     */
    processExits(rootTokenAddress: RootTokenAddress, options): PromiEvent<any>;
}