const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')
const { ZkEvmClient, use } = require('@maticnetwork/maticjs')
const SCALING_FACTOR = new bn(10).pow(new bn(18))
const { Web3ClientPlugin } = require('@maticnetwork/maticjs-web3')

use(Web3ClientPlugin)

const privateKey = config.user1.privateKey
const userAddress = config.user1.address

const getZkEvmClient = (network = 'testnet', version = 'blueberry') => {
  const zkEvmClient = new ZkEvmClient()
  return zkEvmClient.init({
    log: true,
    network: network,
    version: version,
    child: {
      provider: new HDWalletProvider(privateKey, config.rpc.zkEvm.child),
      defaultConfig: {
        from: userAddress,
      },
    },
    parent: {
      provider: new HDWalletProvider(privateKey, config.rpc.zkEvm.parent),
      defaultConfig: {
        from: userAddress,
      },
    },
  })
}

module.exports = {
  SCALING_FACTOR,
  getZkEvmClient: getZkEvmClient,
  zkEvm: config.zkEvm,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
  proofApi: config.proofApi,
}
