const Matic = require('maticjs').default
const config = require('./config')

const token = config.KOVAN_TEST // test token address
const amount = '4200000000000000000000000000000' // amount in wei
const from = '0x6e0c217de3235f1d8a95605d10bcc1b36ff7996f' // from address

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
  .approveTokensForDeposit(token, amount, {
    from,
    onTransactionHash: tx => {
      // action on Transaction success
      console.log(tx)
    },
  })
  .then(() => {
    // Deposit tokens
    matic.depositTokens(token, from, amount, {
      from,
      onTransactionHash: tx => {
        // action on Transaction success
        console.log(tx)
      },
    })
  })
