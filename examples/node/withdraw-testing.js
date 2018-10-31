const Matic = require('maticjs').default
const config = require('./config')

const mtoken = '0x343461c74133E3fA476Dbbc614a87473270a226c' // test token address
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

matic.wallet = '<private-key>' // prefix with `0x`

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
      // console.log(transactionHash)
    },
  })
  .then(async() => {
    await sleepFor(5000)
    // submit checkpoint (this is for tetsing purpose only)
    matic
      ._apiCall({
        url: `${config.SYNCER_URL}/block/submit-checkpoint`,
      })
      .then(async() => {
        // wait till checkpoint is submitted, then only procced
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
