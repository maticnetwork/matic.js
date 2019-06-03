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
matic.wallet = config.PRIVATE_KEY // prefix with `0x`

const tokenAddress = config.ROPSTEN_ERC721_TOKEN // token address on mainchain
const from = config.FROM_ADDRESS // from address

matic
  .tokenOfOwnerByIndexERC721(from, tokenAddress, 0, {
    from,
    parent: true, // For transaction on Main network (false for Matic Network)
  })
  .then(hash => {
    // action on Transaction success
    console.log(hash) // eslint-disable-line
  })
