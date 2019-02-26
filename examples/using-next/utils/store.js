import Matic from 'maticjs'

const from = '0x5784d63560319839e5696a283096e169d1F4E659' // from address
const token = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2' // test token address

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
      watcherUrl: process.env.WATCHER_URL
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
