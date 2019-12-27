const bn = require('bn.js')

const Matic = require('@maticnetwork/maticjs').default
const config = require('./config')
const token = config.PARENT_TEST_TOKEN // test token address
// const amount = '1000000000000000000' // amount in wei
const amount = new bn(100000000) // amount in wei

const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  registry: config.REGISTRY_ADDRESS,
  depositManager: config.DEPOSITMANAGER_ADDRESS,
  withdrawManager: config.WITHDRAWMANAGER_ADDRESS,
})

matic.initialize().then(() => {
  matic.setWallet(config.PRIVATE_KEY)
  // Approve token
  matic
    .approveERC20TokensForDeposit(token, amount, {
      from,
    })
    .then((receipt) => {
      // Deposit tokens
      console.log("receipt", receipt) // eslint-disable-line
    })

})