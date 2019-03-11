const Matic = require('../../lib/index').default
const config = require('./config')

const token = config.ERC721_TOKEN // test token address
const tokenId = '34' // amount in wei
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

matic
  .approveERC721TokenForDeposit(token, tokenId, {
    from,
    onTransactionHash: () => {
      // action on Transaction success
    },
  })
  .then(() => {
    matic.depositERC721Tokens(token, from, tokenId, {
      from,
      onTransactionHash: () => {
        // action on Transaction success
      },
    })
  })
