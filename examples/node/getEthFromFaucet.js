const Matic = require('maticjs').default
const config = require('./config')
const from = '0x6e0c217de3235f1d8a95605d10bcc1b36ff7996f' // from address

// Create object of Matic
const matic = new Matic({
  maticProvider: config.MATIC_PROVIDER,
  parentProvider: config.PARENT_PROVIDER,
  rootChainAddress: config.ROOTCHAIN_ADDRESS,
  syncerUrl: config.SYNCER_URL,
  watcherUrl: config.WATCHER_URL,
  maticWethAddress: config.MATICWETH_ADDRESS,
  ethFaucetAddress: config.ETHFAUCET_ADDRESS,
})


matic.wallet = '<private-key>'

matic.getEthFromFaucet('0x7eD7f36694153bA6EfF6ca6726b60F6E2Bb17fcf', {
  from,
  onTransactionHash: () => {
    // action on Transaction success
  },
})
