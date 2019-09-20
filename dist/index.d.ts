import DepositManager from './root/DepositManager';
import { SendOptions } from './types/Common';
export default class Matic {
    _web3: any;
    parentWeb3: any;
    depositManager: DepositManager;
    constructor(options?: any, _defaultOptions?: SendOptions);
}
