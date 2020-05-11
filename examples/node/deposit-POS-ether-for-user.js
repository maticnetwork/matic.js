const bn = require('bn.js')

const Matic = require('@maticnetwork/maticjs').default
const config = require('./config')
const utils = require('./utils')

const amount = new bn(1).mul(utils.SCALING_FACTOR)
const from = config.FROM_ADDRESS

// Create Matic object
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
})

async function execute() {
  matic.setWallet(config.PRIVATE_KEY)
  return matic.depositPOSEtherForUser(from, amount, { from, gasPrice: '10000000000' })
}

// eslint-disable-next-line
execute().then(console.log)
