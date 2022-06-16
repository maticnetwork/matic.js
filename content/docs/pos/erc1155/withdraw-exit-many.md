---
Title: 'withdrawExitMany erc1155 POS  '
Keywords: 'pos client, erc1155, withdrawExitMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExitMany

`withdrawExitMany` method can be used to exit the withdraw process by using the txHash from `withdrawStartMany` method.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
