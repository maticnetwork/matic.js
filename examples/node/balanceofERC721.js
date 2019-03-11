const Matic = require('../../lib/index').default
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
matic.wallet = config.PRIVATE_KEY // prefix with `0x`

const tokenAddress = config.ERC721_MATIC // token address on mainchain
const from = config.FROM_ADDRESS // from address

matic.balanceOfERC721(from, tokenAddress, {
  parent: true,
}).then(() => {
  // action on Transaction success
})
