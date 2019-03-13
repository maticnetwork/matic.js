// const Matic = require('maticjs').default
const Matic = require('../../lib/index').default
const config = require('./config')

const from = config.FROM_ADDRESS // from address
const to = '0x732Ef34f3c8D9dE1855aEd5630C3C4071031eb5b' // to address

const token = config.MATIC_TOKEN // test token address
const amount = '10000000000000000' // amount in wei

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
matic.transferTokens(token, to, amount, {
  from,
  // parent: true, // For token transfer on Main network (false for Matic Network)
  onTransactionHash: () => {
    // action on Transaction success
    // console.log(tx)
  },
})
