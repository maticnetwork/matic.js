const bn = require('bn.js')

const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient
const config = require('../config')
const utils = require('../utils')

const rootToken = config.ROPSTEN_TEST_TOKEN
const amount = new bn(1).mul(utils.SCALING_FACTOR)
const from = config.FROM_ADDRESS

// Create Matic object
const maticPOSClient = new MaticPOSClient({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
})

async function execute() {
  maticPOSClient.setWallet(config.PRIVATE_KEY)
  await maticPOSClient.approveERC20ForDeposit(rootToken, amount, { from, gasPrice: '10000000000' })
  return maticPOSClient.depositERC20ForUser(rootToken, from, amount, { from, gasPrice: '10000000000' })
}

// eslint-disable-next-line
async function executeRaw() {
  let txParams = await maticPOSClient.approveERC20ForDeposit(rootToken, amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  await maticPOSClient.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)

  txParams = await maticPOSClient.depositERC20ForUser(rootToken, from, amount, { from, encodeAbi: true })
  serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  return maticPOSClient.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)
}

// eslint-disable-next-line
execute().then(console.log)
