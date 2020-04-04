const bn = require('bn.js')

const Network = require('@maticnetwork/meta/network')
const Matic = require('../dist/index').default

const SCALING_FACTOR = new bn(10).pow(new bn(18))

async function getMaticClient(_network, _version) {
  const network = new Network(_network, _version)
  const matic = new Matic({
    maticProvider: network.Matic.RPC,
    parentProvider: network.Main.RPC,
    rootChain: network.Main.Contracts.RootChain,
    registry: network.Main.Contracts.Registry,
    depositManager: network.Main.Contracts.DepositManagerProxy,
    withdrawManager: network.Main.Contracts.WithdrawManagerProxy,
  })
  await matic.initialize()
  const wallet = matic.web3Client.getWallet()
  return { matic, network, wallet }
}

function getPrivateKey() {
  if (!process.env.PRIVATE_KEY) {
    throw new Error('Please set the PRIVATE_KEY env variable')
  }
  return process.env.PRIVATE_KEY
}

module.exports = {
  SCALING_FACTOR,
  getMaticClient,
  getPrivateKey,
}
