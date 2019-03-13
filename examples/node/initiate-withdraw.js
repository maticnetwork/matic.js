const Matic = require('../../lib/index').default
const config = require('./config')

const token = config.MATIC_TEST_TOKEN // test token address
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

matic
  .startWithdraw(token, amount, {
    from,
    onTransactionHash: () => {
      // action on Transaction success
    },
  })

// NOTE: Wait for next checkpoint, which will take approximately 5-10 mins. 
// Then you can call complete-withdraw.js to submit proof.
