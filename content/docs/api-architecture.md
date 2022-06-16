---
Title: 'API Architecture'
Keywords: 'api architecture, api type, read, write, polygon'
Description: 'The library follows common api architecture throughout'
---

The library follows common api architecture throughout and the APIs are divided into two types -

1. Read API
2. Write API

## Read API

Read APIs does not publish anything on blockchain, so it does not consume any gas. Example of read APIs are - `getBalance`, `isWithdrawExited` etc.

Let's see an example of read API -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

read APIs are very simple and returns result directly.

## 2. Write API

Write APSs publish some data on the blockchain, so it consumes gas. Example of write APIs are - `approve`, `deposit` etc.

When you are calling a write API - you need two data from the result.

1. TransactionHash
2. TransactionReceipt

<br>
Let's see an example of write API and get the transactionhash and receipt -

```
const erc20 = posClient.erc20('<token address>');

// send the transaction
const result = await erc20.approve(10);

// get transaction hash

const txHash = await result.getTransactionHash();

// get receipt

const receipt = await result.getReceipt();

```

### Transaction option

There are some configurable options that are available for all API's. These configurations can be passed in parameters.

Available configurations are -

- from?: string | number - The address transactions should be made from.
- to?: string - The address transactions should be made to.
- value?: number | string | BN - The value transferred for the transaction in wei.
- gasLimit?: number | string - The maximum gas provided for a transaction (gas limit).
- gasPrice?: number | string | BN - The gas price in wei to use for transactions.
- data?: string - The byte code of the contract.
- nonce?: number;
- chainId?: number;
- chain?: string;
- hardfork?: string;
- returnTransaction?: boolean - making it true will return the transaction object which can be used to send transaction manually.

<br>
Let's see an example by configuring the gasPrice -

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
