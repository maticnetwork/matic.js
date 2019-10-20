const Matic = require('maticjs').default
const config = require('./config')

const token = config.PARENT_TEST_TOKEN // test token address
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
  .allowanceERC20TokensForDeposit(from, token)
  .then(result => {
    console.log(result) // eslint-disable-line
  })
  .catch(e => {
    console.log(e) // eslint-disable-line
  })
