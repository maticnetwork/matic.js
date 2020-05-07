const bn = require('bn.js')

const Matic = require('@maticnetwork/maticjs').default

const config = require('./config')

const childToken = config.MATIC_POS_TEST_TOKEN // test token address
const amount = new bn(100000000) // amount in wei

const from = config.FROM_ADDRESS // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
})

matic.setWallet(config.PRIVATE_KEY)
matic
  .burnPOSERC20(childToken, amount, {
    from,
  })
  .then(res => {
    console.log(res) // eslint-disable-line
  })
