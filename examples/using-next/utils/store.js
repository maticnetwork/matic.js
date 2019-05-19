import Matic from 'maticjs'
import config from '../config'
import Web3 from 'web3';

const from = '0x87b917F40f7a031e13577200801b5f2f0D3E1b91'; // from address
const token = '0x6b0b0e265321e788af11b6f1235012ae7b5a6808'; // test token address

class MaticSingleton {
  static instance = null;

  constructor(privateKey) {
    if (!privateKey) {
      throw new Error(`Please specify private key for the transaction signature. Got ${privateKey}`)
    }
    const matic = new Matic({
      maticProvider: config.MATIC_PROVIDER,
      parentProvider: config.PARENT_PROVIDER,
      rootChainAddress: config.ROOTCHAIN_ADDRESS,
      maticWethAddress: config.MATIC_WETH_ADDRESS,
      syncerUrl: config.SYNCER_URL,
      watcherUrl: config.WATCHER_URL,
      withdrawManagerAddress: config.WITHDRAWMANAGER_ADDRESS,
    });
    matic.wallet = privateKey;
    //TODO: figure out whether the address is necessary
    const web3 = new Web3(config.PARENT_PROVIDER);
    const account = web3.eth.accounts.privateKeyToAccount(privateKey);
    const fromAddress = account.address;
  }

  static getInstance(privateKey) {
    if (!MaticSingleton.instance) {
      MaticSingleton.instance = new MaticSingleton(privateKey);
    }
    return MaticSingleton.instance;
  }
}


const Store = () => {
  const privateKey = process.env.PRIVATE_KEY || "0x807BABA1E3243457A5AACF323AAC201709A46692D28C8806EFB111E31639A111";
  const matic = MaticSingleton.getInstance(privateKey);
  return {
    matic,
    from,
    token,
  }
};

export default new Store()
