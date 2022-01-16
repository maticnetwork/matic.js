---
Title: 'withdrawStartMany erc1155 POS  '
Keywords: 'pos client, erc1155, withdrawStartMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawStartMany

`withdrawStartMany` method can be used to initiate the withdraw process which will burn the specified amounts of multiple token respectively on polygon chain.

```
const erc1155Token = posClient.erc1155(<root token address>);

const result = await erc1155Token.withdrawStartMany([<token id1>, <token id2>],[<amount1>,<amount2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
