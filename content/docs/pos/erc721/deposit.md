---
Title: 'deposit erc721 POS  '
Keywords: 'pos client, erc721, deposit, polygon, sdk'
Description: 'Get started with maticjs'
---

# deposit

`deposit` method can be used to deposit a token from ethereum to polygon chain.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.deposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
