const Matic = require('@maticnetwork/maticjs').default

const config = require('./config')

const from = config.FROM_ADDRESS // from address

// 0xbbaf7712bc426b665650992215f9c15ac9bda72bbb4e7d453ba9ed3875e0ebf5 ERC721 withdraw
var transactionHash = '0xbbaf7712bc426b665650992215f9c15ac9bda72bbb4e7d453ba9ed3875e0ebf5' // Insert txHash generated from initiate-withdraw.js

// Create object of Matic
const matic = new Matic({
   maticProvider: config.MATIC_PROVIDER,
   parentProvider: config.PARENT_PROVIDER,
   rootChain: config.ROOTCHAIN_ADDRESS,
   registry: config.REGISTRY_ADDRESS,
   depositManager: config.DEPOSITMANAGER_ADDRESS,
   withdrawManager: config.WITHDRAWMANAGER_ADDRESS,
})

matic.initialize().then(() => {
   matic.setWallet(config.PRIVATE_KEY)
   matic.withdrawNFT(transactionHash, {
      from,
   }).then((res) => {
      console.log(res) // eslint-disable-line
      // 0xebece1474592c1556b3389a1a76908b9bdfd4118e1d3f2e9308d6f1c5f173dd4
   })
})
//Wait for 5 mins till the checkpoint is submitted, then run the confirm withdraw
