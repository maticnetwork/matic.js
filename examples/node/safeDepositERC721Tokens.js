const Matic = require('@maticnetwork/maticjs').default
const config = require('./config')

const token = config.PARENT_ERC721_TOKEN // test token address
const from = config.FROM_ADDRESS // from address
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

matic.wallet = config.PRIVATE_KEY // prefix with `0x`sla

matic.initialize().then(() => {
  matic.setWallet(config.PRIVATE_KEY)
  matic.safeDepositERC721Tokens(token, tokenId, {
    from,
  }).then((receipt) => {
    // Deposit tokens
    console.log('receipt', receipt) // eslint-disable-line
  })

})