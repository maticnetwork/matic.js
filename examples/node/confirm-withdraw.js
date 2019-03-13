// const Matic = require('maticjs').default
const Matic = require('../../lib/index').default
const config = require('./config')

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

var transactionHash = '0x38952f3fe7828d13ebe0268163e522930a606e6ec46133326fc5d64d0c818f10'

//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
matic.withdraw(transactionHash, {
   from,
   onTransactionHash: () => {
   // action on Transaction success
//    console.log('Withdraw complete',txHash)
   },
})