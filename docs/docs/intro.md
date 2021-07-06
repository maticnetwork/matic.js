---
sidebar_position: 1
title: Introduction
slug: /
---

The [`@matic.js`](https://github.com/maticnetwork/matic.js/) client library makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Matic Network.

### Quick Setup

Install the maticjs package via npm:

```bash
$ npm install --save @maticnetwork/maticjs
$ npm i --save @maticnetwork/meta
```

Now we have two options either use **PoS** or **Plasma**. 
The default maticjs returns the Plasma client.

```js
// Plasma Client
const Matic = require("@maticnetwork/maticjs");
// We can get Pos client by adding .MaticPOSClient
const MaticPoSClient = require("@maticnetwork/maticjs").MaticPOSClient;
```
You will also need to create another file config.json. This will contain all configuration related to Matic.js.

```js
{
    "MATIC_PROVIDER": "https://rpc-mumbai.matic.today", 
    "PARENT_PROVIDER": "https://goerli.infura.io/v3/75aa7935112647bc8cc49d20beafa189", 
    "ROOTCHAIN_ADDRESS": "0x2890bA17EfE978480615e330ecB65333b880928e", 
    "WITHDRAWMANAGER_ADDRESS": "0x2923C8dD6Cdf6b2507ef91de74F1d5E0F11Eac53", 
    "DEPOSITMANAGER_ADDRESS": "0x7850ec290A2e2F40B82Ed962eaf30591bb5f5C96",  
    "PRIVATE_KEY": "your_pvt_key", // Append 0x to your private key
    "FROM_ADDRESS": "your address",
    "GOERLI_ERC20": "0xb2eda8A855A4176B7f8758E0388b650BcB1828a4", 
    "MATIC_ERC20": "0xc7bb71b405ea25A9251a1ea060C2891b84BE1929", 
    "REGISTRY": "0xeE11713Fe713b2BfF2942452517483654078154D",
    "MUMBAI_ERC721":"0xa38c6F7FEaB941160f32DA7Bbc8a4897b37876b5",
    "GOERLI_ERC721":"0x0217B02596Dfe39385946f82Aab6A92509b7F352",
    "MUMBAI_WETH":"0x4DfAe612aaCB5b448C12A591cD0879bFa2e51d62",
    "GOERLI_WETH":"0x60D4dB9b534EF9260a88b0BED6c486fe13E604Fc"
  }
```

Create `maticProvider` and `ethereumProvider` as it will be needed later.
```js
const maticProvider = new WalletConnectProvider({
  host: config.MATIC_RPC,
  callbacks: {
    onConnect: console.log("matic connected"),
    onDisconnect: console.log("matic disconnected!"),
  },
});

const ethereumProvider = new WalletConnectProvider({
  host: config.ETHEREUM_RPC,
  callbacks: {
    onConnect: console.log("mainchain connected"),
    onDisconnect: console.log("mainchain disconnected"),
  },
});

```

Create these functions to directly call in API using provider.

```js 
// posClientGeneral facilitates the operations like approve, deposit, exit
const posClientParent = () => {
  const maticPoSClient = new MaticPoSClient({
    network: config.NETWORK,
    version: config.VERSION,
    maticProvider: maticProvider,
    parentProvider: window.web3,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  return maticPoSClient;
};
// posclientBurn facilitates the burning of tokens on the matic chain
const posClientChild = () => {
  const maticPoSClient = new MaticPoSClient({
    network: config.NETWORK,
    version: config.VERSION,
    maticProvider: window.web3,
    parentProvider: ethereumprovider,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  return maticPoSClient;
};
// getMaticPlasmaClient facilitates the burning of tokens on the matic chain
const getMaticPlasmaParent = async (
  _network = config.NETWORK,
  _version = config.VERSION
) => {
  const network = new Network(_network, _version);
  const matic = new Matic({
    network: _network,
    version: _version,
    parentProvider: window.web3,
    maticProvider: maticProvider,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  await matic.initialize();
  return { matic, network };
};

// getMaticPlasmaClientBurn facilitates the operations like approve, deposit,confirmWithdraw ,exit
const getMaticPlasmaChild = async (
  _network = config.NETWORK,
  _version = config.VERSION
) => {
  const matic = new Matic({
    network: _network,
    version: _version,
    parentProvider: ethereumprovider,
    maticProvider: window.web3,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
  });
  await matic.initialize();
  return { matic };
};
```

Now we can call api methods on these instance for example.
More of these API are covered in PoS API and Plasma APi.

```js
// Eg POS ERC20 functionality
const depositERC20 = async () => {
  const maticPoSClient = posClientParent();
  const x = inputValue * 1000000000000000000; // 18 decimals
  const x1 = x.toString();
  await maticPoSClient.approveERC20ForDeposit(config.posRootERC20, x1, {
    from: account,
  });
  await maticPoSClient.depositERC20ForUser(config.posRootERC20, account, x1, {
    from: account,
  });
};
```

> Never store your private key in code on production — this is added in the config.js file for illustration purposes. Typically a user’s private key will be stored in a browser wallet such as Metamask or a mobile wallet such as the Matic wallet, Status or a hardware wallet.



> If you wish to directly refer a set of code examples, you can do so at https://github.com/maticnetwork/matic.js/tree/master/examples