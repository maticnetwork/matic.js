const Matic = require('maticjs').default
const config = require('./config')

const from = config.FROM_ADDRESS // from address
const receipent = 'Paste Your receipent address here ...' // receipent address

const token = config.MATIC_ERC721_TOKEN // test token address
const tokenId = '1' // ERC721 token Id

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
matic.transferERC721Tokens(token, receipent, tokenId, {
  from,
  // parent: true, // For token transfer on Main network (false for Matic Network)
  onTransactionHash: (hash) => {
    // action on Transaction success
    console.log(hash) // eslint-disable-line
  },
})
