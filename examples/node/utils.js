const bn = require('bn.js')
const EthereumTx = require('ethereumjs-tx')

const config = require('./config')
const Matic = require('../../lib/index').default

const SCALING_FACTOR = new bn(10).pow(new bn(18))

function buildRawTransaction(txParams, privateKey) {
  const tx = new EthereumTx(txParams)
  tx.sign(Buffer.from(privateKey.slice(2), 'hex'))
  let serializedTx = tx.serialize()
  serializedTx = '0x' + serializedTx.toString('hex')
  // console.log({ serializedTx })
  return serializedTx
}

function getMaticClient() {
  return new Matic({
    maticProvider: config.MATIC_PROVIDER,
    parentProvider: config.PARENT_PROVIDER,
    rootChain: config.ROOTCHAIN_ADDRESS,
    registry: config.REGISTRY_ADDRESS,
    depositManager: config.DEPOSITMANAGER_ADDRESS,
    withdrawManager: config.WITHDRAWMANAGER_ADDRESS,
    childChain: config.CHILDCHAIN_ADDRESS,
  })
}

module.exports = {
  SCALING_FACTOR,
  buildRawTransaction,
  getMaticClient,
}
