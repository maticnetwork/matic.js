const Matic = require('../../lib/index').default
const config = require('./config')

const token = config.ERC721_MATIC // test token address
const tokenId = '34' // tokenId
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
  '0xe7a17a9bf636d837c1b9ab493f3fe5808390062c2ff9bc310aae8d05aaa113cb'

matic
  .startERC721Withdraw(token, tokenId, {
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
