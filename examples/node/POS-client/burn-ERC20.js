const bn = require('bn.js')

const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

const config = require('../config')

const childToken = config.MATIC_POS_TEST_TOKEN // test token address
const amount = new bn(100000000) // amount in wei

const from = config.FROM_ADDRESS // from address

// Create object of Matic
const maticPOSClient = new MaticPOSClient({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
})

maticPOSClient.setWallet(config.PRIVATE_KEY)
maticPOSClient
  .burnERC20(childToken, amount, {
    from,
  })
  .then(res => {
    console.log(res) // eslint-disable-line
  })
