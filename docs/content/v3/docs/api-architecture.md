---
Title: 'API Type'
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

The library follows common api architecture throughout and APIS are divided into two type -

1. Read API
2. Write API

## Read API

Read api does not publish anything on blockchain, so do not consume any gas. Example of read apis are - `getBalance`, `isWithdrawExited` etc.

Let's see an example of read api -

```
const erc20 = posClient.erc20('<token address>');
const balance = await erc20.getBalance('<user address>')
```

read api are very simple and returns result directly.

## 2. Write API

Write api publish some data on blokchain, so consume gas. Example of write apis are - `approve`, `deposit` etc.

When you are calling a write API - you need two data from the result.

1. TransactionHash
2. TransactionReceipt

<br>
Let's see an example of write api and get transactionhash and receipt -

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

There are some configurable option available for all API. The configuration can be passed in parameter.

Available configuration are -

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
Let's see an example by configuring gasPrice -

```
const erc20RootToken = posClient.erc20(<root token address>,true);

// approve 100 amount
const approveResult = await erc20Token.approve(100, {
    gasPrice: '4000000000',
});

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
