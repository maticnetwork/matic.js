const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')
const { HermezClient, use } = require('@maticnetwork/maticjs')
const SCALING_FACTOR = new bn(10).pow(new bn(18))
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')

use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const userAddress = config.user1.address

const getHermezClient = (network = 'testnet', version = 'blueberry') => {
  const hermezClient = new HermezClient()
  return hermezClient.init({
    log: true,
    network: network,
    version: version,
    child: {
      provider: new HDWalletProvider(privateKey, config.rpc.hermez.child),
      defaultConfig: {
        from: userAddress,
      },
    },
    parent: {
      provider: new HDWalletProvider(privateKey, config.rpc.hermez.parent),
      defaultConfig: {
        from: userAddress,
      },
    },
  })
}

module.exports = {
  SCALING_FACTOR,
  getHermezClient: getHermezClient,
  hermez: config.hermez,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
  proofApi: config.proofApi,
}
