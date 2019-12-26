const Matic = require('@maticnetwork/maticjs').default

const config = require('./config')

const from = config.FROM_ADDRESS // from address
const recipient = '0x9fB29AAc15b9A4B7F17c3385939b007540f4d791' // receipent address

const token = config.MATIC_ERC721_TOKEN // test token address
const tokenId = 1963

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
  matic.transferERC721Tokens(token, recipient, tokenId, {
    from,
    // encodeAbi: true,
    // parent: true, // For token transfer on Main network (false for Matic Network)
  }).then((res)=>{
    console.log("hash", res) // eslint-disable-line
  })
})

