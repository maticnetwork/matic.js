const Matic = require('../../lib/index').default
const config = require('./config')

const token = config.TEST_TOKEN // test token address
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

// Approve token
matic
  .approveERC20TokensForDeposit(token, amount, {
    from,
    onTransactionHash: () => {
      // action on Transaction success
      // console.log(tx)
    },
  })
  .then(() => {
    // Deposit tokens
    matic.depositERC20Tokens(token, from, amount, {
      from,
      onTransactionHash: () => {
        // action on Transaction success
        // console.log(tx)
      },
    })
  })
