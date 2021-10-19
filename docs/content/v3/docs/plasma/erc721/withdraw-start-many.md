---
Title: 'withdrawStartMany erc721 plasma  '
Keywords: 'plasma client, erc721, withdrawStartMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawStartMany

`withdrawStartMany` method can be used to initiate the withdraw process which will burn the multiple token on polygon chain.

```
const erc721Token = plasmaClient.erc721(<root token address>);

const result = await erc721Token.withdrawStartMany([<token id1>, <token id2>]);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
