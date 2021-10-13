---
sidebar_position: 1
---

# Initialize Plasma client

#### Node Syntax

```js
const Matic = require('maticjs')

const maticPlasmaClient = new Matic(options)
maticPlasmaClient.initialize()
```

#### Es6 Syntax

```js
import Matic from 'maticjs'

const maticPlasmaClient = new Matic(options)
maticPlasmaClient.initialize()
```

## Options

Options can be provided in constructor in order to customize the client.

```
import Matic from 'maticjs';

const options = {
    network: "testnet",
    version: "mumbai",
    maticProvider: window.web3,
    parentProvider: ethereumprovider,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
}
const maticPlasmaClient = new Matic(options)
```

Available options are :

- `network` can be `string`
- `version` can be `string`
- `maticProvider` can be `string` or `Web3.providers` instance. This provider must connect to Matic chain. Value can be anyone of following:
  - `network.Matic.RPC`
  - `new Web3.providers.HttpProvider(network.Matic.RPC)`
  - [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
- `parentProvider` can be `string` or `Web3.providers` instance. This provider must connect to Ethereum chain (testnet or mainchain). Value can be anyone of following:
  - `network.Main.RPC`
  - `new Web3.providers.HttpProvider(network.Main.RPC)`
  - [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
- `parentDefaultOptions` is simple Javascript `object` with following options
  - `from` must be valid account address(required)
- `maticDefaultOptions` is simple Javascript `object` with following options
  - `from` must be valid account address(required)

---
