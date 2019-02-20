const Matic = require('maticjs').default
const config = require('./config')

const from = '0x6E0c217dE3235F1D8a95605d10bCC1B36ff7996f' // from address
const to = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // to address

const token = config.TEST_TOKEN // test token address
const amount = '1' // amount in wei

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

// Send Tokens
matic.transferTokens(token, to, amount, {
  from,
  // parent: true, // For token transfer on Main network (false for Matic Network)
  onTransactionHash: tx => {
    // action on Transaction success
    console.log(tx)
  },
})
