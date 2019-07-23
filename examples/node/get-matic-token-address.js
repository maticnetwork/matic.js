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
  depositManagerAddress: config.DEPOSITMANAGER_ADDRESS,
})

const tokenAddress = config.ROPSTEN_TEST_TOKEN // token address on mainchain

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// get token address mapped with mainchain token address
matic.getMappedTokenAddress(tokenAddress).then((hash) => {
  // action on Transaction success
  console.log(hash) // eslint-disable-line
})
