const Matic = require('maticjs').default
const config = require('./config')

const from = config.FROM_ADDRESS // from address
const rootTokenAddress = config.ROPSTEN_ERC721_TOKEN

// Create object of Matic
const matic = new Matic({
 maticProvider: config.MATIC_PROVIDER,
 parentProvider: config.PARENT_PROVIDER,
 rootChainAddress: config.ROOTCHAIN_ADDRESS,
 syncerUrl: config.SYNCER_URL,
 watcherUrl: config.WATCHER_URL,
 withdrawManagerAddress: config.WITHDRAWMANAGER_ADDRESS,
})

matic.wallet = config.PRIVATE_KEY // prefix with `0x`


// NOTE: Wait for NFT Challenge period tobe complete
matic.processExits(rootTokenAddress, {
   from,
   onTransactionHash: (hash) => {
   // action on Transaction success
   // DEVNOTE: on sucessfull processExits funds will be transfered to your mainchain account
   console.log(hash) // eslint-disable-line
   },
})