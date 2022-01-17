---
Title: 'withdrawExit erc721 POS  '
Keywords: 'pos client, erc721, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExit

`withdrawExit` method can be used to exit the withdraw process by using the txHash from `withdrawStart` method.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
