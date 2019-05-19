const Matic = require('maticjs')
const config = require('./config')

const token = '0xcc5de81d1af53dcb5d707b6b33a50f4ee46d983e' // test token address
const recipient = '0x7ed7f36694153ba6eff6ca6726b60f6e2bb17fcf' // test recipient address
const amount = '10000000000000000'
const from = '0x87b917F40f7a031e13577200801b5f2f0D3E1b91' // from address

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
matic.transferTokens(token, recipient, amount, {
  from,
  onTransactionHash: (resp) => {
    // action on Transaction success
    // eslint-disable-next-line
    console.log('Transaction hash:', resp)
  },
})
