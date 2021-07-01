---
sidebar_position: 1
---

# new Matic(options)

Creates Matic SDK instance with give options. It returns a MaticSDK object.

```js
import Matic from "maticjs";

const matic = new Matic(options);
matic.initialize();
```

- `options` is simple Javascript `object` which can have following fields:
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
