import Matic from 'maticjs'

const from = '0x87b917F40f7a031e13577200801b5f2f0D3E1b91' // from address
const token = '0x6b0b0e265321e788af11b6f1235012ae7b5a6808' // test token address

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

    matic.wallet = '<private-key>' // your private key
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
