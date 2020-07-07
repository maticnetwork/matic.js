// const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient
const MaticPOSClient = require('../../../lib/index').MaticPOSClient
const config = require('./config')
const HDWalletProvider = require('@truffle/hdwallet-provider')

const getMaticPOSClient = () => {
  return new MaticPOSClient({
    network: 'testnet', // optional, default is testnet
    version: 'mumbai', // optional, default is mumbai
    parentProvider: new HDWalletProvider(config.user.privateKey, config.root.RPC),
    maticProvider: new HDWalletProvider(config.user.privateKey, config.child.RPC),
    posRootChainManager: config.root.POSRootChainManager,
    posERC20Predicate: config.root.posERC20Predicate, // optional, required only if working with ERC20 tokens
    posERC721Predicate: config.root.posERC721Predicate, // optional, required only if working with ERC721 tokens
    posERC1155Predicate: config.root.posERC1155Predicate, // optional, required only if working with ERC71155 tokens
    parentDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
    maticDefaultOptions: { from: config.user.address }, // optional, can also be sent as last param while sending tx
  })
}

module.exports = {
  getMaticPOSClient,
}
