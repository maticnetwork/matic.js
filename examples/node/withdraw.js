const Matic = require('maticjs').default
const config = require('./config')

const token = config.TEST_TOKEN // test token address
const amount = '1000000000000000000' // amount in wei
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
  withdrawManagerAddress: config.WITHDRAWMANAGER_ADDRESS,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`

var transactionHash =
  '0x4b4879943dbc209794741807214df8fb1da06c751ae6e4d6ffdf5aad64c17936'

matic
  .startWithdraw(token, amount, {
    from,
    onTransactionHash: txHash => {
      transactionHash = txHash
      console.log(txHash)
    },
  })
  .then(() => {
    //wait till checkpoint is submitted, then only procced
    matic.withdraw(transactionHash, {
      from,
      onTransactionHash: tx => {
        // action on Transaction success
        console.log(tx)
      },
    })
  })
