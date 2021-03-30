const bn = require('bn.js')

const Matic = require('@maticnetwork/maticjs').default
const config = require('./config')
const utils = require('./utils')

const token = config.ROPSTEN_TEST_TOKEN
const amount = new bn(1).mul(utils.SCALING_FACTOR)
const from = config.FROM_ADDRESS

// Create Matic object
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  registry: config.REGISTRY_ADDRESS,
  depositManager: config.DEPOSITMANAGER_ADDRESS,
  withdrawManager: config.WITHDRAWMANAGER_ADDRESS,
})

async function execute() {
  await matic.initialize()
  matic.setWallet(config.PRIVATE_KEY)
  return matic.approveERC20TokensForDeposit(token, amount, { from })
}

async function executeRaw() {
  // eslint-disable-line
  await matic.initialize()
  const txParams = await matic.approveERC20TokensForDeposit(token, amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  return matic.web3Client.parentEth.sendSignedTransaction(serializedTx)
}

execute().then(console.log) // eslint-disable-line
