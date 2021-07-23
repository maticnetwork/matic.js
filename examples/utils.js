const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')
const Network = require('@maticnetwork/meta/network')
const MaticPlasmaClient = require('@maticnetwork/maticjs').default
const SCALING_FACTOR = new bn(10).pow(new bn(18))

const privateKey = config.user1.privateKey
const fromAddress = config.user1.address

async function getMaticPlasmaClient(network = 'testnet', version = 'mumbai') {
  const networkInstance = new Network(network, version)
  const { from } = getAccount()
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

function getAccount() {
  if (!privateKey || !fromAddress) {
    throw new Error('Please set the PRIVATE_KEY/FROM in config.js')
  }
  return { privateKey: privateKey, from: fromAddress }
}

module.exports = {
  SCALING_FACTOR,
  getMaticPlasmaClient: getMaticPlasmaClient,
  getAccount,
  child: config.child,
}
