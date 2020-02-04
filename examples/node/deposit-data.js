const bn = require('bn.js')

const Matic = require('../../dist/index').default
const config = require('./config')
const utils = require('./utils')

const token = config.PARENT_TEST_TOKEN
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
  childChain: config.CHILDCHAIN_ADDRESS,
})

async function execute() {
  await matic.initialize()
  matic.setWallet(config.PRIVATE_KEY)
  return matic.depositDataByHash('0x8cff1ef2b198273fe7f9fb41918cd7e3e8d04c58650614af39b3086e1de1a7e6')
  // return matic.depositManager.isDepositExistById(101230019, '0xa2EF03edfA084ac9e5Bf110e409Ed5483BAe4101')
}

async function executeRaw() {
  // eslint-disable-line
  await matic.initialize()
  let txParams = await matic.approveERC20TokensForDeposit(token, amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  await matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)

  txParams = await matic.depositERC20ForUser(token, from, amount, { from, encodeAbi: true })
  serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)
}

execute().then(console.log) // eslint-disable-line
