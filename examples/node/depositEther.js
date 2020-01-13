const Matic = require('../../dist/index').default

const config = require('./config')
const utils = require('./utils')

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

const amount = matic.web3Client.web3.utils.toWei('.001', 'ether')

async function execute() {
  await matic.initialize()
  matic.setWallet(config.PRIVATE_KEY)
  return matic.depositEther(amount, { from })
}

async function executeRaw() { // eslint-disable-line
  await matic.initialize()
  matic.setWallet(config.PRIVATE_KEY)
  const txParams = await matic.depositEther(amount, { from, encodeAbi: true })
  let serializedTx = utils.buildRawTransaction(txParams, config.PRIVATE_KEY)
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction(serializedTx)
}

execute().then(console.log) // eslint-disable-line
