const Matic = require('@maticnetwork/maticjs').default

const config = require('./config')

const from = config.FROM_ADDRESS // from address
const rootTokenAddress = config.PARENT_TEST_TOKEN // Root token address

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
   matic.processExits(rootTokenAddress, {
      from,
   }).then((res) => {
      console.log(res) // eslint-disable-line
   })
})
