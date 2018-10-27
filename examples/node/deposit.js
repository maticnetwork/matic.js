const Matic = require('maticjs').default
const config = require('./config')

const token = '0x343461c74133E3fA476Dbbc614a87473270a226c' // test token address
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

// Approve token
matic
  .approveTokensForDeposit(token, amount, {
    from,
    onTransactionHash: () => {
      // action on Transaction success
    },
  })
  .then(() => {
    // Deposit tokens
    matic.depositTokens(token, from, amount, {
      from,
      onTransactionHash: () => {
        // action on Transaction success
      },
    })
  })
