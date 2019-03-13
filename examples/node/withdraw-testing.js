// const Matic = require('maticjs').default
const Matic = require('../../lib/index').default
const config = require('./config')

const mtoken = config.MATIC_TOKEN // test token address
const amount = '10000000000000000' // amount in wei
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

var transactionHash = null

function sleepFor(timeInMilliSeconds = 1000) {
  return new Promise(resolve => {
    setTimeout(resolve, timeInMilliSeconds)
  })
}

matic
  .startWithdraw(mtoken, amount, {
    from,
    onTransactionHash: txHash => {
      transactionHash = txHash
      // console.log(txHash)
    },
  })
  .then(async() => {
    // console.log('Sleeping for 5 seconds')
    await sleepFor(5000)
    // submit checkpoint (this is for tetsing purpose only)
    // console.log('Submitting checkpoint')
    matic
      ._apiCall({
        url: `${config.SYNCER_URL}/block/submit-checkpoint`,
      })
      .then(async() => {
        // wait till checkpoint is submitted, then only procced
        // console.log('Sleeping for 5 seconds')
        await sleepFor(15000)
        matic.withdraw(transactionHash, {
          from,
          onTransactionHash: () => {
            // action on Transaction success
            // console.log('tx', tx)
          },
        })
      })
  })
