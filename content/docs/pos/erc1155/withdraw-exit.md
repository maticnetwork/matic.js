---
Title: 'withdrawExit erc1155 POS  '
Keywords: 'pos client, erc1155, withdrawExit, polygon, sdk'
Description: 'withdrawExit method can be used to exit the withdraw process by using the txHash from withdrawStart method.'
---

# withdrawExit

`withdrawExit` method can be used to exit the withdraw process by using the txHash from `withdrawStart` method.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExit(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
