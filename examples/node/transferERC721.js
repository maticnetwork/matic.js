const Matic = require('../../lib/index').default
const config = require('./config')

const from = config.FROM_ADDRESS // from address
const to = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // to address

const token = config.MATIC_ERC721_TOKEN // test token address
const tokenId = '32' // tokenId 

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

// Send Tokens
matic.transferERC721Tokens(token, to, tokenId, {
  from,
  // parent: true, // For token transfer on Main network (false for Matic Network)
  onTransactionHash: () => {
    // action on Transaction success
  },
})
