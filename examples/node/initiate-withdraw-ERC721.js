const Matic = require('@maticnetwork/maticjs').default

const config = require('./config')

const token = config.MATIC_ERC721_TOKEN // test token address
const tokenId = 1963 // tokenId

const from = config.FROM_ADDRESS // from address

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
  matic
    .startWithdrawForNFT(token, tokenId, {
      from,
    }).then((res) => {
      console.log(res) // eslint-disable-line
    })

})
