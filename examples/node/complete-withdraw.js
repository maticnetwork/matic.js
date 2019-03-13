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
  withdrawManagerAddress: config.WITHDRAWMANAGER_ADDRESS,	
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`


var transactionHash = 'Paste txHash here ...' // Insert txHash generated from initiate-withdraw.js 

    //wait till checkpoint is submitted, then only procced
    matic.withdraw(transactionHash, {
      from,
      onTransactionHash: () => {
        // action on Transaction success
      },
    })