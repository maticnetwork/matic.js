const readline = require('readline')

const Matic = require('../../../lib/index').default

const maticProvider = 'https://testnet.matic.network'
const parentProvider = 'https://kovan.infura.io/matic'
const rootChainAddress = '0x24e01716a6ac34d5f2c4c082f553d86a557543a7'
const syncerUrl = 'https://eth-syncer.api.matic.network/api/v1'
const watcherUrl = 'https://eth-watcher.api.matic.network/api/v1'

const mtoken = '0xc60CEc8200513c4eAaF179783d30CdcE8DED8492'
const amount = '10000000000000000'
const from = '0x6e0c217de3235f1d8a95605d10bcc1b36ff7996f'

// Create object of Matic
const matic = new Matic({
  maticProvider,
  parentProvider,
  rootChainAddress,
  syncerUrl,
  watcherUrl,
})

matic.wallet = '<private-key>'

var transactionHash = null
readline.emitKeypressEvents(process.stdin)
process.stdin.setRawMode(true)

matic
  .startWithdraw(mtoken, amount, {
    from,
    onTransactionHash: txHash => {
      transactionHash = txHash
    },
  })
  .then(() => {
    //wait till checkpoint is submitted, then only procced
    process.stdin.on('keypress', () => {
      matic.withdraw(transactionHash, {
        from,
        onTransactionHash: () => {
          // action on Transaction success
          process.exit()
        },
      })
    })
    // Please submit checkpoint and press any key for continue...
    // console.log('Please submit checkpoint and press any key for continue...')
  })
