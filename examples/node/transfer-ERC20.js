const bn = require('bn.js')

const Matic = require('@maticnetwork/maticjs').default

const config = require('./config')

const from = config.FROM_ADDRESS // from address
const recipient = 'Paste Your receipent address here ...' // receipent address

const token = config.MATIC_TEST_TOKEN // test token address
const amount = new bn(100000000) // amount in wei


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
  matic.transferERC20Tokens(token, recipient, amount, {
    from,
    // parent: true, // For token transfer on Main network (false for Matic Network)
  }).then((res)=>{
    console.log("hash", res) // eslint-disable-line
  })
})

