import DepositManager from './root/DepositManager';
import RootChain from './root/RootChain';
import Registry from './root/Registry';
import WithdrawManager from './root/WithdrawManager';
import Web3Client from './common/Web3Client';
export default class Matic {
    web3Client: Web3Client;
    depositManager: DepositManager;
    rootChain: RootChain;
    withdrawManager: WithdrawManager;
    registry: Registry;
    constructor(options?: any);
    initialize(): Promise<void[]>;
}
