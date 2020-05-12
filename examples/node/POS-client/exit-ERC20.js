const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

const config = require('../config')

const from = config.FROM_ADDRESS // from address

// Wait till checkpoint is submitted for the block containing burn tx, then run exitPOSERC20
const burnTxHash = '0xbbaf7712bc426b665650992215f9c15ac9bda72bbb4e7d453ba9ed3875e0ebf5' // Insert txHash generated from burn-POS-ERC20.js

// Create object of Matic
const maticPOSClient = new MaticPOSClient({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
})

maticPOSClient.setWallet(config.PRIVATE_KEY)
maticPOSClient
  .exitERC20(burnTxHash, {
    from,
  })
  .then(res => {
    // eslint-disable-next-line
    console.log(res)
  })
