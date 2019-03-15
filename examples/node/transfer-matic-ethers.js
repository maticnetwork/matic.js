const Matic = require('maticjs').default
const config = require('./config')

const from = config.FROM_ADDRESS // from address
const to = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // to address
const amount = '100000000000000' // amount in wei

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
  maticWethAddress: config.MATICWETH_ADDRESS,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// Send Matic Ethers
matic.transferMaticEthers(to, amount, {
  from,
  onTransactionHash: () => {
    // action on Transaction success
  },
})
