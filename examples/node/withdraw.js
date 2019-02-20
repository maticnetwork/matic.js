const Matic = require('maticjs').default
const config = require('./config')

const mtoken = config.TEST_TOKEN // test token address
const amount = '10000000000000000' // amount in wei
const from = '0x6e0c217de3235f1d8a95605d10bcc1b36ff7996f' // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

var transactionHash =
  '0x4b4879943dbc209794741807214df8fb1da06c751ae6e4d6ffdf5aad64c17936'

// matic.startWithdraw(mtoken, amount, {
//   from,
//   onTransactionHash: txHash => {
//     transactionHash = txHash
//     console.log(txHash)
//   },
// })
// .then(() => {
//wait till checkpoint is submitted, then only procced
matic.withdraw(transactionHash, {
  from,
  onTransactionHash: tx => {
    // action on Transaction success
    console.log(tx)
  },
})
// })
