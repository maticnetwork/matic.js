const Matic = require('maticjs').default
const config = require('./config')

const mtoken = '0xc60CEc8200513c4eAaF179783d30CdcE8DED8492' // test token address
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

var transactionHash = null

matic
  .startWithdraw(mtoken, amount, {
    from,
    onTransactionHash: txHash => {
      transactionHash = txHash
    },
  })
  .then(() => {
    //wait till checkpoint is submitted, then only procced
    matic.withdraw(transactionHash, {
      from,
      onTransactionHash: () => {
        // action on Transaction success
        process.exit()
      },
    })
  })
