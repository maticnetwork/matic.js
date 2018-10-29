const Matic = require('maticjs')
const config = require('./config')

const token = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2' // test token address
const user = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // test user address
const amount = '10000000000000000'
const from = '0x6e0c217de3235f1d8a95605d10bcc1b36ff7996f' // test user address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = '<private-key>'

// Send Tokens
matic.transferTokens(token, user, amount, {
  from,
  onTransactionHash: (resp) => {
    // action on Transaction success
    // eslint-disable-next-line
    console.log('transferTokens::', resp)
  },
})
