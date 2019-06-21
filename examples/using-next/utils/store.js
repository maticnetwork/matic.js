import Matic from 'maticjs'

const from = '0x87b917F40f7a031e13577200801b5f2f0D3E1b91' // from address
const token = '0xc82c13004c06E4c627cF2518612A55CE7a3Db699' // test token address

let matic = null

// Create sdk instance
function initMatic() {
  if (!matic) {
    matic = new Matic({
      maticProvider: process.env.MATIC_PROVIDER,
      parentProvider: process.env.PARENT_PROVIDER,
      rootChainAddress: process.env.ROOTCHAIN_ADDRESS,
      maticWethAddress: process.env.MATIC_WETH_ADDRESS,
      syncerUrl: process.env.SYNCER_URL,
      watcherUrl: process.env.WATCHER_URL,
      withdrawManagerAddress: process.env.WITHDRAWMANAGER_ADDRESS,
    })

    // your private key, prefixed with '0x'
    matic.wallet = '<private-key>'
  }
}

const Store = () => {
  initMatic()
  return {
    matic,
    from,
    token,
  }
}

export default new Store()
