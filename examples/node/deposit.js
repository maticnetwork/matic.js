const Matic = require('maticjs').default
const config = require('./config')

const token = '0xC4375B7De8af5a38a93548eb8453a498222C4fF2' // test token address
const amount = '10000000000000000'
const from = '0x6e0c217de3235f1d8a95605d10bcc1b36ff7996f' // test user address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
})

matic.wallet = '<private-key>'

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
