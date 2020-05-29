const bn = require('bn.js')

const MaticPOSClient = require('@maticnetwork/maticjs').MaticPOSClient

const config = require('../config')

const childToken = config.MATIC_POS_TEST_TOKEN // test token address
const amount = new bn(100000000) // amount in wei

const recipient = "0xBDC6bb454C62E64f13FA2876F78cdAfA20089204"
const from = config.FROM_ADDRESS // from address

// Create object of Matic
const maticPOSClient = new MaticPOSClient({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChain: config.ROOTCHAIN_ADDRESS,
  posRootChainManager: config.POS_ROOT_CHAIN_MANAGER_ADDRESS,
  biconomyAPIKey: config.BICONOMY_API_KEY
})

maticPOSClient.setWallet(config.PRIVATE_KEY)
maticPOSClient
  .networkAgnosticTransfer(childToken, recipient, amount, from, {
    from,
  })
  .then(res => {
    console.log(res) // eslint-disable-line
  })