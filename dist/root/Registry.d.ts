import Web3 from 'web3';
import { address, SendOptions } from '../types/Common';
export default class DepositManager {
    private _registryContract;
    private _defaultOptions;
    constructor(_registryContractAddress: address, _parentWeb3: Web3, _defaultOptions?: SendOptions);
}
