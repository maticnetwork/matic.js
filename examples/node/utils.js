const bn = require('bn.js')
const EthereumTx = require('ethereumjs-tx')

const SCALING_FACTOR = new bn(10).pow(new bn(18))

function buildRawTransaction(txParams, privateKey) {
  const tx = new EthereumTx(txParams)
  tx.sign(Buffer.from(privateKey.slice(2), 'hex'))
  let serializedTx = tx.serialize()
  serializedTx = '0x' + serializedTx.toString('hex')
  // console.log({ serializedTx })
  return serializedTx
}

module.exports = {
  SCALING_FACTOR,
  buildRawTransaction,
}
