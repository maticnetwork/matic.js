// Testnet V3 config
module.exports = {
  plasma: {
    parent: {
      erc20: '0x3f152B63Ec5CA5831061B2DccFb29a874C317502',
      erc721: '0x4f765cd1d33b2e9ae6dcba1f5852de93b285eb78',
    },
    child: {
      erc721: '0x0f3Fb1354337965BAd0775a75c692D167fbb39F9',
      erc20: '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e',
    },
    REGISTRY_ADDRESS: '0x56B082d0a590A7ce5d170402D6f7f88B58F71988',
    ROOTCHAIN_ADDRESS: '0x82a72315E16cE224f28E1F1fB97856d3bF83f010', // The address for the main Plasma contract in  Ropsten testnet
    WITHDRAWMANAGER_ADDRESS: '0x3cf9aD3395028a42EAfc949e2EC4588396b8A7D4', // An address for the WithdrawManager contract on Ropsten testnet
    DEPOSITMANAGER_ADDRESS: '0x3Bc6701cA1C32BBaC8D1ffA2294EE3444Ad93989', // An address for a DepositManager contract in Ropsten testnet
  },
  parent: {
    rpc: '<goerli RPC>',
  },
  child: {
    rpc: 'https://rpc-mumbai.matic.today', // This is the MATIC testnet RPC
  },
  pos: {
    parent: {
      erc20: '0x655f2166b0709cd575202630952d71e2bb0d61af',
      erc721: '0x5a08d01e07714146747950CE07BB0f741445D1b8',
      erc1155: '0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063',
    },
    child: {
      erc721: '0xEC8CB8bBb069470bC358ffB0e3710c64830da383',
      erc20: '0x2d7882beDcbfDDce29Ba99965dd3cdF7fcB10A1e',
      weth: '0x714550C2C1Ea08688607D86ed8EeF4f5E4F22323',
      erc1155: '0xA07e45A987F19E25176c877d98388878622623FA',
    },
  },
  SYNCER_URL: 'https://testnetv3-syncer.api.matic.network/api/v1', // Backend service which syncs the Matic sidechain state to a MySQL database which we use for faster querying. This comes in handy especially for constructing withdrawal proofs while exiting assets from Plasma.
  WATCHER_URL: 'https://testnetv3-watcher.api.matic.network/api/v1', // Backend service which syncs the Matic Plasma contract events on Ethereum mainchain to a MySQL database which we use for faster querying. This comes in handy especially for listening to asset deposits on the Plasma contract.
  ROOTWETH_ADDRESS: '0x7BdDd37621186f1382FD59e1cCAE0316F979a866', // This is a wrapped ETH ERC20 contract address so that we can support ETH deposits to the sidechain
  CHILDCHAIN_ADDRESS: '0xa2EF03edfA084ac9e5Bf110e409Ed5483BAe4101', // This is child chain contract address
  MATICWETH_ADDRESS: '0x8567184E6F9b1B77f24AfF6168453419AD22f90e', // The corresponding wrapped ETH ERC20 contract address on the Matic chain
  ROPSTEN_TEST_TOKEN: '0x28C8713DDe7F063Fdc4cA01aB2A8856e0F243Fec', // Contract for ERC20 in Ropsten
  MATIC_TEST_TOKEN: '0x9a93c912F4eFf0254d178a18ACD980C1B05b57b0', // Contract for ERC20 in Matic testnet
  ROPSTEN_ERC721_TOKEN: '0x07d799252cf13c01f602779b4dce24f4e5b08bbd', // Contract for ERC721 in Ropsten testnet
  MATIC_ERC721_TOKEN: '0x8D5231e0B79edD9331e0CF0d4B9f3F30d05C47A5', // Contract for ERC721 in matic testnet
  POS_ROOT_CHAIN_MANAGER_ADDRESS: '0x86B4EC021875d0123ED209A333B29D67F9AC6540', // Address of RootChainManager for POS Portal
  MATIC_POS_TEST_TOKEN: '0x7f57bd9A688b1461633aE56452C2391b2f0d2e91', // Contract for POS ERC20 on matic testnet,
  user1: {
    privateKey: '<paste your private key here>', // A sample private key prefix with `0x`
    address: '<paste address belonging to private key here>', // Your address
  },
  user2: {
    address: '<paste address here>', // Your address
  },
}
