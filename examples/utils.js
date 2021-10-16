const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')
const { POSClient, PlasmaClient, use } = require('@maticnetwork/maticjs')
const SCALING_FACTOR = new bn(10).pow(new bn(18))
const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");

use(Web3ClientPlugin);

const privateKey = config.user1.privateKey
const userAddress = config.user1.address


async function getPlasmaClient(network = 'testnet', version = 'mumbai') {
  const plasmaClient = new PlasmaClient({
    network: network,
    version: version,
    child: {
      provider: new HDWalletProvider(privateKey, config.child.rpc),
      defaultConfig: {
        from: userAddress
      }
    },
    parent: {
      provider: new HDWalletProvider(privateKey, config.parent.rpc),
      defaultConfig: {
        from: userAddress
      }
    }
  })
  return plasmaClient.init();
}

const getPOSClient = (network = 'testnet', version = 'mumbai') => {
  const posClient = new POSClient({
    log: true,
    network: network,
    version: version,
    child: {
      provider: new HDWalletProvider(privateKey, config.child.rpc),
      defaultConfig: {
        from: userAddress
      }
    },
    parent: {
      provider: new HDWalletProvider(privateKey, config.parent.rpc),
      defaultConfig: {
        from: userAddress
      }
    }
  })
  return posClient.init();
}

module.exports = {
  SCALING_FACTOR,
  getPlasmaClient: getPlasmaClient,
  getPOSClient: getPOSClient,
  child: config.child,
  plasma: config.plasma,
  pos: config.pos,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
}
