# Matic SDK

[![Build Status](https://travis-ci.org/maticnetwork/matic.js.svg?branch=master)](https://travis-ci.org/maticnetwork/matic.js)

This repository contains the `matic.js` client lib. `matic.js` makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Matic Network.

This library will help developers to move assets from Ethereum chain to Matic chain, and withdraw from Matic to Ethereum using fraud proofs.

We will be improving this library to make all features available like Plasma Faster Exit, challenge exit, finalize exit and more.

### Installation

```bash
$ npm install --save @maticnetwork/matic.js # or yarn add @maticnetwork/matic.js
```

### Getting started

```js
// Import Matic sdk
import Matic from '@maticnetwork/matic.js'

// Create sdk instance
const matic = new Matic({
  
  // Set Matic provider - string or provider instance
  // Example: 'https://testnet.matic.network' OR new Web3.providers.HttpProvider('http://localhost:8545')
  maticProvider: <web3-provider>,
  
  // Set Mainchain provider - string or provider instance
  // Example: 'https://kovan.infura.io' OR new Web3.providers.HttpProvider('http://localhost:8545')
  parentProvider: <web3-provider>,
  
  // Set rootchain contract. See below for more information
  rootChainAddress: <root-contract-address>,
  
  // Syncer API URL
  // Fetches tx/receipt proof data instead of fetching whole block on client side
  syncerUrl: <syncer-url>, // (optional)
  
  // Watcher API URL
  // Fetches headerBlock info from mainchain & finds appropriate headerBlock for given blockNumber
  watcherUrl: <watcher-url>, // (optional)
})

// Set wallet
// Warning: Not-safe
// matic.wallet = <private-key> // Use metamask provider or use WalletConnect provider instead.

// Approve token for deposit
await matic.approveTokens(
  token,  // Token address,
  amount  // Token amount for approval (in wei)
)

// Deposit token into Matic chain. Remember to call `approveTokens` before
await matic.depositTokens(
  token,  // Token address
  user,   // User address (in most cases, this will be sender's address),
  amount  // Token amount for deposit (in wei)
)

// Transfer token on Matic
await matic.transferTokens(
  token,  // Token address
  user,   // Recipient address
  amount  // Token amount for deposit (in wei)
)
```

### How it works?

The flow for asset transfers on the Matic Network is as follows:

- User deposits crypto assets in Matic contract on mainchain
- Once deposited tokens get confirmed on the main chain, the corresponding tokens will get reflected on the Matic chain.
- The user can now transfer tokens to anyone they want instantly with negligible fees. Matic chain has faster blocks (approximately ~ 1 second). That way, the transfer will be done almost instantly.
- Once a user is ready, they can withdraw remaining tokens from the mainchain by establishing proof of remaining tokens on Root contract (contract deployed on Ethereum chain)

## API

- <a href="#initialize"><code>new Matic()</code></a>
- <a href="#approveTokens"><code>matic.<b>approveTokens()</b></code></a>
- <a href="#depositTokens"><code>matic.<b>depositTokens()</b></code></a>
- <a href="#depositEthers"><code>matic.<b>depositEthers()</b></code></a>
- <a href="#transferTokens"><code>matic.<b>transferTokens()</b></code></a>
- <a href="#startWithdraw"><code>matic.<b>startWithdraw()</b></code></a>
- <a href="#withdraw"><code>matic.<b>withdraw()</b></code></a>

---

<a name="initialize"></a>

### new Matic(options)

Creates Matic SDK instance with give options. It returns a MaticSDK object.

```
const matic = new Matic(options)
```

- `options` is simple Javascript `object` which can have following fields:
    - `maticProvider` can be `string` or `Web3.providers` instance. This provider must connect to Matic chain. Value can be anyone of following: 
         * `'https://testnet.matic.network'`
         * `new Web3.providers.HttpProvider('http://localhost:8545')`
         * [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
    - `parentProvider` can be `string` or `Web3.providers` instance. This provider must connect to Ethereum chain (testnet or mainchain). Value can be anyone of following: 
         * `'https://kovan.infura.io'`
         * `new Web3.providers.HttpProvider('http://localhost:8545')`
         * [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
    - `rootChainAddress` must be valid Ethereum contract address.
    - `syncerUrl` must be valid API host. MaticSDK uses this value to fetch receipt/tx proofs instead of getting whole block to client side.
    - `watcherUrl` must be valid API host. MaticSDK uses this value to fetch headerBlock info from mainchain and to find appropriate headerBlock for given blockNumber.

---

<a name="approveTokens"></a>

### matic.approveTokens(token, amount, options)

Approves given `amount` of `token` to `rootChainContract`.

- `token` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` (optional) must be valid javascript object containing `from`, `gasPrice`, `gasLimit`, `nonce` and/or `value`

This returns `Promise` object.

---
