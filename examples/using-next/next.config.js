module.exports = {
  env: {
    // Will be available on both server and client
    MATIC_PROVIDER: 'http://68.183.166.5:8545/',
    PARENT_PROVIDER: 'https://ropsten.infura.io/matic',
    ROOTCHAIN_ADDRESS: '0xa1214e7046db461ca3c3fddb19417d8c84a58d64',
    WITHDRAWMANAGER_ADDRESS: '0xa407d3c17f2bc54f3c5031a704150d628c8868d8',	
    MATIC_WETH_ADDRESS: '0x74f2a31a044c87bd687f2dcd5f858940f9c28d0c',
    SYNCER_URL: 'https://matic-syncer.api.matic.network/api/v1',
    WATCHER_URL: 'https://ropsten-watcher.api.matic.network/api/v1',
  },
}
