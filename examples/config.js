const dotenv = require('dotenv');
const path = require('path');
const env = dotenv.config({
  path: path.join(__dirname, '.env')
});

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
    registryAddress: '0x56B082d0a590A7ce5d170402D6f7f88B58F71988',
    rootChainAddress: '0x82a72315E16cE224f28E1F1fB97856d3bF83f010', // The address for the main Plasma contract in  Ropsten testnet
    withdrawManagerAddress: '0x3cf9aD3395028a42EAfc949e2EC4588396b8A7D4', // An address for the WithdrawManager contract on Ropsten testnet
    depositManagerAddress: '0x3Bc6701cA1C32BBaC8D1ffA2294EE3444Ad93989', // An address for a DepositManager contract in Ropsten testnet
  },
  parent: {
    rpc: process.env.ROOT_RPC,
  },
  child: {
    rpc: process.env.MATIC_RPC || 'https://rpc-mumbai.matic.today',
  },
  pos: {
    parent: {
      erc20: '0x655f2166b0709cd575202630952d71e2bb0d61af',
      erc721: '0x5a08d01e07714146747950CE07BB0f741445D1b8',
      erc1155: '0x2e3Ef7931F2d0e4a7da3dea950FF3F19269d9063',
      chainManagerAddress: '0x86B4EC021875d0123ED209A333B29D67F9AC6540', // Address of RootChainManager for POS Portal
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
  user1: {
    // '<paste your private key here>' - A sample private key prefix with `0x`
    privateKey: process.env.PRIVATE_KEY,
    //'<paste address belonging to private key here>', Your address
    address: process.env.FROM
  },
  user2: {
    address:  process.env.USER2_ADDRESS
  },
}
