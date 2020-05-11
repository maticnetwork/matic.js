const bn = require('bn.js')

const Matic = require('@maticnetwork/maticjs').default
const config = require('./config')
const utils = require('./utils')

const rootToken = config.ROPSTEN_TEST_TOKEN
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
  return matic.approvePOSERC20ForDeposit(rootToken, amount, { from })
}

// eslint-disable-next-line
async function executeRaw() {
  await matic.initialize()
  const txParams = await matic.approvePOSERC20ForDeposit(rootToken, amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)
}

// eslint-disable-next-line
execute().then(console.log)
