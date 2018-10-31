import Matic from 'maticjs'

const config = {
  'MATIC_PROVIDER': 'https://testnet.matic.network',
  'PARENT_PROVIDER': 'https://kovan.infura.io/matic',
  'ROOTCHAIN_ADDRESS': '0x24e01716a6ac34d5f2c4c082f553d86a557543a7',
  'SYNCER_URL': 'https://eth-syncer.api.matic.network/api/v1',
  'WATCHER_URL': 'https://eth-watcher.api.matic.network/api/v1',
}

let matic = null

function init() {
  if (!matic) {
    // Create object of Matic
    matic = new Matic({
      maticProvider: config.MATIC_PROVIDER,
      parentProvider: config.PARENT_PROVIDER,
      rootChainAddress: config.ROOTCHAIN_ADDRESS,
      syncerUrl: config.SYNCER_URL,
      watcherUrl: config.WATCHER_URL,
    })

    matic.wallet = '<private-key>'
  }
}

init()

export default matic
