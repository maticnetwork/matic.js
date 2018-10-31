const Matic = require('maticjs').default
const config = require('./config')

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
  maticWethAddress: config.MATICWETH_ADDRESS,
})

const tokenAddress = '0x670568761764f53E6C10cd63b71024c31551c9EC' // token address on mainchain

matic.wallet = '<private-key>' // prefix with `0x`

// get token address mapped with mainchain token address
matic.getMappedTokenAddress(tokenAddress).then(() => {
  // action on Transaction success
})
