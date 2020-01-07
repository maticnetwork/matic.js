const bn = require('bn.js')
const EthereumTx = require('ethereumjs-tx')

const Matic = require('../../dist/index').default
const config = require('./config')

const SCALING_FACTOR = new bn(10).pow(new bn(18))

const token = config.ROPSTEN_TEST_TOKEN
const amount = new bn(1).mul(SCALING_FACTOR)
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

async function executeRaw() { // eslint-disable-line
  await matic.initialize()
  matic.setWallet(config.PRIVATE_KEY)
  const txParams = await matic.approveERC20TokensForDeposit(token, amount, { from, encodeAbi: true })
  // console.log({ txParams })
  const tx = new EthereumTx(txParams)
  tx.sign(Buffer.from(config.PRIVATE_KEY.slice(2), 'hex'))
  const serializedTx = tx.serialize()
  // console.log({ serializedTx: serializedTx.toString('hex') })
  return matic.web3Client.parentWeb3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
}

execute().then(console.log) // eslint-disable-line
