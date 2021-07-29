const bn = require('bn.js')
const HDWalletProvider = require('@truffle/hdwallet-provider')
const config = require('./config')
const Network = require('@maticnetwork/meta/network')
const MaticPlasmaClient = require('@maticnetwork/maticjs').default
const { MaticPOSClient } = require('@maticnetwork/maticjs')
const SCALING_FACTOR = new bn(10).pow(new bn(18))

const privateKey = config.user1.privateKey
const userAddress = config.user1.address

async function getMaticPlasmaClient(network = 'testnet', version = 'mumbai') {
  const networkInstance = new Network(network, version)
  const from = config.user1.address
  const matic = new MaticPlasmaClient({
    network: network,
    version: version,
    parentProvider: new HDWalletProvider(privateKey, config.parent.rpc),
    maticProvider: new HDWalletProvider(privateKey, config.child.rpc),
    parentDefaultOptions: { from: userAddress },
    maticDefaultOptions: { from: userAddress },

    // rootChain: config.plasma.rootChainAddress,
    // registry: config.plasma.registryAddress,
    // depositManager: config.plasma.depositManagerAddress,
    // withdrawManager: config.plasma.withdrawManagerAddress,
    // childChain: config.plasma.childChainAddress,
  })
  await matic.initialize()
  return { matic, network: networkInstance }
}

const getMaticPOSClient = () => {
  return new MaticPOSClient({
    network: 'testnet', // For mainnet change this to mainnet
    version: 'mumbai', // For mainnet change this to v1
    parentProvider: new HDWalletProvider(privateKey, config.parent.rpc),
    maticProvider: new HDWalletProvider(privateKey, config.child.rpc),
    parentDefaultOptions: { from: userAddress },
    maticDefaultOptions: { from: userAddress },
    posRootChainManager: config.pos.parent.chainManagerAddress,

    // optional, required only if working with ERC20 tokens
    // posERC20Predicate: config.pos.parent.erc20Predicate,
    // // optional, required only if working with ERC721 tokens
    // posERC721Predicate: config.pos.parent.erc721Predicate,
    // // optional, required only if working with ERC71155 tokens
    // posERC1155Predicate: config.pos.parent.erc1155Predicate,
  })
}

module.exports = {
  SCALING_FACTOR,
  getMaticPlasmaClient: getMaticPlasmaClient,
  getMaticPOSClient: getMaticPOSClient,
  child: config.child,
  plasma: config.plasma,
  pos: config.pos,
  from: config.user1.address,
  privateKey: config.user1.privateKey,
  to: config.user2.address,
}
