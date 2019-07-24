module.exports = {
  MATIC_PROVIDER: 'https://testnet2.matic.network', // This is the MATIC testnet RPC
  PARENT_PROVIDER:
    'https://ropsten.infura.io/v3/70645f042c3a409599c60f96f6dd9fbc', // This is the Ropsten testnet RPC
  ROOTCHAIN_ADDRESS: '0x60e2b19b9a87a3f37827f2c8c8306be718a5f9b4', // The address for the main Plasma contract in  Ropsten testnet
  WITHDRAWMANAGER_ADDRESS: '0x4ef2b60cdd4611fa0bc815792acc14de4c158d22', // An address for the WithdrawManager contract on Ropsten testnet
  DEPOSITMANAGER_ADDRESS: '0x4072fab2a132bf98207cbfcd2c341adb904a67e9',  // An address for a DepositManager contract in Ropsten testnet
  SYNCER_URL: 'https://matic-syncer2.api.matic.network/api/v1', // Backend service which syncs the Matic sidechain state to a MySQL database which we use for faster querying. This comes in handy especially for constructing withdrawal proofs while exiting assets from Plasma. 
  WATCHER_URL: 'https://ropsten-watcher2.api.matic.network/api/v1', // Backend service which syncs the Matic Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract. 
  ROOTWETH_ADDRESS: '0x421dc9053cb4b51a7ec07b60c2bbb3ec3cfe050b',  // This is a wrapped ETH ERC20 contract address so that we can support ETH deposits to the sidechain 
  MATICWETH_ADDRESS: '0x31074c34a757a4b9FC45169C58068F43B717b2D0', // The corresponding wrapped ETH ERC20 contract address on the Matic chain 
  PRIVATE_KEY: '<paste your private key here>', // A sample private key prefix with `0x`
  FROM_ADDRESS: '<paste address belonging to private key here>',// Your address 
  ROPSTEN_TEST_TOKEN: '0x70459e550254b9d3520a56ee95b78ee4f2dbd846', // Contract for ERC20 in Ropsten
  MATIC_TEST_TOKEN: '0xc82c13004c06E4c627cF2518612A55CE7a3Db699', // Contract for ERC20 in Matic testnet
  ROPSTEN_ERC721_TOKEN: '0x07d799252cf13c01f602779b4dce24f4e5b08bbd', // Contract for ERC721 in Ropsten testnet
  MATIC_ERC721_TOKEN: '0x9f289a264b6db56d69ad53f363d06326b984e637', // Contract for ERC721 in matic testnet
}