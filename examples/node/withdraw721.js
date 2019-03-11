const Matic = require('../../lib/index').default
const config = require('./config')

const token = config.ERC721_MATIC // test token address
const tokenId = '31' // tokenId
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
  '0x517356669a8766de1efe9a065a2c8e05364f239b7a36bf2a7753c0a6f8e968f8'

matic
  .startWithdraw(token, tokenId, {
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
        // console.log(tx)
        // action on Transaction success
      },
    })
  })
