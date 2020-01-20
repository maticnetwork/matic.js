# Matic SDK

[![Build Status](https://travis-ci.org/maticnetwork/matic.js.svg?branch=master)](https://travis-ci.org/maticnetwork/matic.js)

This repository contains the `maticjs` client library. `maticjs` makes it easy for developers, who may not be deeply familiar with smart contract development, to interact with the various components of Matic Network.

This library will help developers to move assets from Ethereum chain to Matic chain, and withdraw from Matic to Ethereum using fraud proofs.

We will be improving this library to make all features available like Plasma Faster Exit, challenge exit, finalize exit and more.

### Installation

#### NPM
---

```bash
$ npm install --save @maticnetwork/maticjs
```

### Getting started

```js
// Import Matic sdk
import Matic from '@maticnetwork/maticjs'

// Create sdk instance
const matic = new Matic({

  // Set Matic provider - string or provider instance
  // Example: 'https://testnet.matic.network' OR new Web3.providers.HttpProvider('http://localhost:8545')
  // Some flows like startExitFor[Metadata]MintableBurntToken, require a webSocket provider such as new web3.providers.WebsocketProvider('ws://localhost:8546')
  maticProvider: <web3-provider>,

  // Set Mainchain provider - string or provider instance
  // Example: 'https://kovan.infura.io' OR new Web3.providers.HttpProvider('http://localhost:8545')
  parentProvider: <web3-provider>,

  // Set rootchain contract. See below for more information
  rootChain: <root-contract-address>,

  // Set registry contract. See below for more information
  registry: <registry-contract-address>,

  // Set withdraw-manager Address. See below for more information
  withdrawManager: <withdraw-manager-address>,

  // Set deposit-manager Address. See below for more information
  depositManager: <deposit-manager-address>,
})

// init matic

matic.initialize()

// Set wallet
// Warning: Not-safe
// matic.setWallet(<private-key>) // Use metamask provider or use WalletConnect provider instead.

// get ERC20 token balance
await matic.balanceOfERC20(
  user, //User address
  tokenAddress, // Token address
  options // transaction fields
)

// get ERC721 token balance
await matic.balanceOfERC721(
  user, // User address
  tokenAddress,  // Token address
  options // transaction fields
)

// get ERC721 token ID
await matic.tokenOfOwnerByIndexERC721(
  from, // User address
  tokenAddress,  // Token address
  index, // index of tokenId
  options // transaction fields
)

// Deposit Ether into Matic chain
await matic.depositEthers(
  amount, // amount in wei for deposit
  options // transaction fields
)

// Approve ERC20 token for deposit
await matic.approveERC20TokensForDeposit(
  token,  // Token address,
  amount,  // Token amount for approval (in wei)
  options // transaction fields
)

// Deposit token into Matic chain. Remember to call `approveERC20TokensForDeposit` before
await matic.depositERC20ForUser(
  token,  // Token address
  user,   // User address (in most cases, this will be sender's address),
  amount,  // Token amount for deposit (in wei)
  options // transaction fields
)

// Deposit ERC721 token into Matic chain.
await matic.safeDepositERC721Tokens(
  token,  // Token address
  tokenId,  // TokenId for deposit
  options // transaction fields
)

// Transfer token on Matic
await matic.transferERC20Tokens(
  token,  // Token address
  user,   // Recipient address
  amount,  // Token amount
  options // transaction fields
)

// Transfer ERC721 token on Matic
await matic.transferERC721Tokens(
  token,  // Token address
  user,   // Recipient address
  tokenId,  // TokenId
  options // transaction fields
)

// Initiate withdrawal of ERC20 from Matic and retrieve the Transaction id
await matic.startWithdraw(
  token, // Token address
  amount, // Token amount for withdraw (in wei)
  options // transaction fields
)

// Initiate withdrawal of ERC721 from Matic and retrieve the Transaction id
await matic.startWithdrawForNFT(
  token, // Token address
  tokenId, // TokenId for withdraw
  options // transaction fields
)

// Withdraw funds from the Matic chain using the Transaction id generated from the 'startWithdraw' method
// after header has been submitted to mainchain
await matic.withdraw(
  txId, // Transaction id generated from the 'startWithdraw' method
  options // transaction fields
)

await matic.withdrawNFT(
  txId, // Transaction id generated from the 'startWithdraw' method
  options // transaction fields
)

await matic.processExits(
  tokenAddress, // root `token` addres
  options // transaction fields
)

```

### How it works?

The flow for asset transfers on the Matic Network is as follows:

- User deposits crypto assets in Matic contract on mainchain
- Once deposited tokens get confirmed on the main chain, the corresponding tokens will get reflected on the Matic chain.
- The user can now transfer tokens to anyone they want instantly with negligible fees. Matic chain has faster blocks (approximately ~ 1 second). That way, the transfer will be done almost instantly.
- Once a user is ready, they can withdraw remaining tokens from the mainchain by establishing proof of remaining tokens on Root contract (contract deployed on Ethereum chain)

### Contracts and addresses

**Matic Testnet**

- RPC endpoint host: https://testnetv3.matic.network
- TEST childchain ERC20 token: 0x9a93c912F4eFf0254d178a18ACD980C1B05b57b0

**Ropsten testnet addresses**

- TEST mainchain ERC20 token: 0x28C8713DDe7F063Fdc4cA01aB2A8856e0F243Fec
- Root Contract: 0x82a72315E16cE224f28E1F1fB97856d3bF83f010
- DepositManager Contract: 0x3Bc6701cA1C32BBaC8D1ffA2294EE3444Ad93989
- WithdrawManager Contract: 0x3cf9aD3395028a42EAfc949e2EC4588396b8A7D4

### Faucet

Please write to info@matic.network to request TEST tokens for development purposes. We will soon have a faucet in place for automatic distribution of tokens for testing.

### API

- <a href="#initialize"><code>new Matic()</code></a>
- <a href="#balanceOfERC20"><code>matic.<b>balanceOfERC20()</b></code></a>
- <a href="#balanceOfERC721"><code>matic.<b>balanceOfERC721()</b></code></a>
- <a href="#tokenOfOwnerByIndexERC721"><code>matic.<b>tokenOfOwnerByIndexERC721()</b></code></a>
- <a href="#depositEther"><code>matic.<b>depositEther()</b></code></a>
- <a href="#approveERC20TokensForDeposit"><code>matic.<b>approveERC20TokensForDeposit()</b></code></a>
- <a href="#depositERC20ForUser"><code>matic.<b>depositERC20ForUser()</b></code></a>
- <a href="#safeDepositERC721Tokens"><code>matic.<b>safeDepositERC721Tokens()</b></code></a>
- <a href="#transferERC20Tokens"><code>matic.<b>transferERC20Tokens()</b></code></a>
- <a href="#transferERC721Tokens"><code>matic.<b>transferERC721Tokens()</b></code></a>
- <a href="#startWithdraw"><code>matic.<b>startWithdraw()</b></code></a>
- <a href="#startWithdrawForNFT"><code>matic.<b>startWithdrawForNFT()</b></code></a>
- <a href="#withdraw"><code>matic.<b>withdraw()</b></code></a>
- <a href="#withdrawNFT"><code>matic.<b>withdrawNFT()</b></code><a>
- <a href="#processExits"><code>matic.<b>processExits()</b></code><a>

##### **WithdrawManager**

- <a href="#startExitForMintableBurntToken"><code>matic.<b>withdrawManager.startExitForMintableBurntToken()</b></code></a>
- <a href="#startExitForMetadataMintableBurntToken"><code>matic.<b>withdrawManager.startExitForMetadataMintableBurntToken()</b></code></a>
---

<a name="initialize"></a>

#### new Matic(options)

Creates Matic SDK instance with give options. It returns a MaticSDK object.

```js
import Matic from "maticjs"

const matic = new Matic(options)
matic.initialize()

```

- `options` is simple Javascript `object` which can have following fields:
  - `maticProvider` can be `string` or `Web3.providers` instance. This provider must connect to Matic chain. Value can be anyone of following:
    - `'https://testnetv3.matic.network'`
    - `new Web3.providers.HttpProvider('http://localhost:8545')`
    - [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
  - `parentProvider` can be `string` or `Web3.providers` instance. This provider must connect to Ethereum chain (testnet or mainchain). Value can be anyone of following:
    - `'https://ropsten.infura.io'`
    - `new Web3.providers.HttpProvider('http://localhost:8545')`
    - [WalletConnect Provider instance](https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js)
  - `rootChain` must be valid Ethereum contract address.
  - `registry` must be valid Ethereum contract address.
  - `withdrawManager` must be valid Ethereum contract address.
  - `depositManager` must be valid Ethereum contract address.
---


---
<a name="balanceOfERC20"></a>


#### matic.balanceOfERC20(userAddress, token, options)

get balance of ERC20 `token` for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For balance on Main chain, use `parent: true`

This returns `balance`.

Example:

```js
matic
  .balanceOfERC20("0xABc578455...", "0x5E9c4ccB05...", {
    from: "0xABc578455..."
  })
  .then(balance => {
    console.log("balance", balance)
  })
```

---
<a name="balanceOfERC721"></a>


#### matic.balanceOfERC721(userAddress, token, options)

get balance of ERC721 `token` for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For balance on Main chain, use `parent: true`

This returns `balance`.

Example:

```js
matic
  .balanceOfERC721("0xABc578455...", "0x5E9c4ccB05...", {
    from: "0xABc578455..."
  })
  .then(balance => {
    console.log("balance", balance)
  })
```

---
<a name="tokenOfOwnerByIndexERC721"></a>


#### matic.tokenOfOwnerByIndexERC721(userAddress, token, index, options)

get ERC721 tokenId at `index` for `token` and for `address`.

- `token` must be valid token address
- `userAddress` must be valid user address
- `index` index of tokenId 


This returns matic `tokenId`.

Example:

```js
matic
  .tokenOfOwnerByIndexERC721("0xfeb14b...", "21", 0, {
    from: "0xABc578455..."
  })
  .then(tokenID => {
    console.log("Token ID", tokenID)
  })
```

<a name="depositEthers"></a>

#### matic.depositEthers(amount, options)

Deposit `options.value`
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit).
  - `from` must be valid account address(required)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.depositEthers(amount, {
  from: '0xABc578455...'
})
```

---
<a name="approveERC20TokensForDeposit"></a>

#### matic.approveERC20TokensForDeposit(token, amount, options)

Approves given `amount` of `token` to `rootChainContract`.

- `token` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` (optional) must be valid javascript object containing `from`, `gasPrice`, `gasLimit`, `nonce`, `value`, `onTransactionHash`, `onReceipt` or `onError`
  - `from` must be valid account address(required)
  - `gasPrice` same as Ethereum `sendTransaction`
  - `gasLimit` same as Ethereum `sendTransaction`
  - `nonce` same as Ethereum `sendTransaction`
  - `value` contains ETH value. Same as Ethereum `sendTransaction`.
This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic
  .approveERC20TokensForDeposit("0x718Ca123...", "1000000000000000000", {
    from: "0xABc578455..."
  })
```

---

<a name="depositERC20ForUser"></a>

#### matic.depositERC20ForUser(token, user, amount, options)

Deposit given `amount` of `token` with user `user`.

- `token` must be valid ERC20 token address
- `user` must be value account address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

matic.depositToken('0x718Ca123...', user, '1000000000000000000', {
  from: '0xABc578455...'
})
```

---

<a name="safeDepositERC721Tokens"></a>

#### matic.safeDepositERC721Tokens(token, tokenId, options)

Deposit given `TokenID` of `token` with user `user`.

- `token` must be valid ERC20 token address
- `tokenId` must be valid token ID
- `options` see [more infomation here](#approveERC20TokensForDeposit)

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js

matic.safeDepositERC721Tokens('0x718Ca123...', '70000000000', {
  from: '0xABc578455...'
})
```

---

<a name="transferERC20Tokens"></a>

#### matic.transferERC20Tokens(token, user, amount, options)

Transfer given `amount` of `token` to `user`.

- `token` must be valid ERC20 token address
- `user` must be value account address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For token transfer on Main chain, use `parent: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

matic.transferERC20Tokens('0x718Ca123...', user, '1000000000000000000', {
  from: '0xABc578455...',

  // For token transfer on Main network
  // parent: true
})
```

---

<a name="transferERC721Tokens"></a>

#### matic.transferERC721Tokens(token, user, tokenId, options)

Transfer given `tokenId` of `token` to `user`.

- `token` must be valid ERC721 token address
- `user` must be value account address
- `tokenId` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For token transfer on Main chain, use `parent: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

matic.transferERC721Tokens('0x718Ca123...', user, '100006500000000000000', {
  from: '0xABc578455...',

  // For token transfer on Main network
  // parent: true
})
```

---

<a name="startWithdraw"></a>

#### matic.startWithdraw(token, amount, options)

Start withdraw process with given `amount` for `token`.

- `token` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic
  .startWithdraw("0x718Ca123...", "1000000000000000000", {
    from: "0xABc578455..."
  })
```

---

<a name="startWithdrawForNFT"></a>

#### matic.startWithdrawForNFT(token, tokenId, options)

Start withdraw process with given `tokenId` for `token`.

- `token` must be valid ERC721 token address
- `tokenId` must be token tokenId (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic
  .startWithdrawForNFT("0x718Ca123...", "1000000000000000000", {
    from: "0xABc578455..."
  })
```

---

<a name="withdraw"></a>

#### matic.withdraw(txId, options)

Withdraw tokens on mainchain using `txId` from `startWithdraw` method after header has been submitted to mainchain.

- `txId` must be valid tx hash
- `options` see [more infomation here](#approveERC20TokensForDeposit)

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.withdraw("0xabcd...789", {
  from: "0xABc578455..."
})
```

---

<a name="withdrawNFT"></a>

#### matic.withdrawNFT(txId, options)

Withdraw tokens on mainchain using `txId` from `startWithdraw` method after header has been submitted to mainchain.

- `txId` must be valid tx hash
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.withdrawNFT("0xabcd...789", {
  from: "0xABc578455..."
})
```

---

<a name="processExits"></a>

#### matic.processExits(rootTokenAddress, options)

Call processExits after completion of challenge period, after that withdrawn funds get transfered to your account on mainchain

- `rootTokenAddress` RootToken address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.processExits("0xabcd...789", {
  from: "0xABc578455..."
})
```
---

#### **WithdrawManager**

<a name="startExitForMintableBurntToken"></a>

#### matic.withdrawManager.startExitForMintableBurntToken(burnTxHash, predicate: address, options)
```
/**
  * Start an exit for a token that was minted and burnt on the side chain
  * Wrapper over contract call: MintableERC721Predicate.startExitForMintableBurntToken
  * @param burnTxHash Hash of the burn transaction on Matic
  * @param predicate address of MintableERC721Predicate
  */
```
See [MintableERC721Predicate.startExitForMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31)

```
const burn = await this.maticClient.startWithdrawForNFT(childErc721.address, tokenId)
await this.maticClient.withdrawManager.startExitForMintableBurntToken(burn.transactionHash, predicate.address)
```
---

<a name="startExitForMetadataMintableBurntToken"></a>

#### matic.withdrawManager.startExitForMintableBurntToken(burnTxHash, predicate: address, options)
```
/**
  * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
  * Wrapper over contract call: MintableERC721Predicate.startExitForMetadataMintableBurntToken
  * @param burnTxHash Hash of the burn transaction on Matic
  * @param predicate address of MintableERC721Predicate
  */
```
See [MintableERC721Predicate.startExitForMetadataMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66)

```
const burn = await this.maticClient.startWithdrawForNFT(childErc721.address, tokenId)
await this.maticClient.withdrawManager.startExitForMetadataMintableBurntToken(burn.transactionHash, predicate.address)
```
---

### Support

Please write to info@matic.network for integration support. If you have any queries, feedback or feature requests, feel free to reach out to us on telegram: [t.me/maticnetwork](https://t.me/maticnetwork)

### License

MIT
