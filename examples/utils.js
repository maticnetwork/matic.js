const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')
const Network = require('@maticnetwork/meta/network')
const MaticPlasmaClient = require('@maticnetwork/maticjs').default
const SCALING_FACTOR = new bn(10).pow(new bn(18))

const privateKey = config.user1.privateKey

async function getMaticPlasmaClient(network = 'testnet', version = 'mumbai') {
  const networkInstance = new Network(network, version)
  const from = config.user1.address
  const matic = new MaticPlasmaClient({
    network: network,
    version: version,
    parentProvider: new HDWalletProvider(privateKey, config.parent.rpc),
    maticProvider: new HDWalletProvider(privateKey, config.child.rpc),
    parentDefaultOptions: { from },
    maticDefaultOptions: { from },
  })
  await matic.initialize()
  return { matic, network: networkInstance }
}

module.exports = {
  SCALING_FACTOR,
  getMaticPlasmaClient: getMaticPlasmaClient,
  child: config.child,
  plasma: config.plasma,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
}
