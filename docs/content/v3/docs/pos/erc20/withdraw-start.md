---
Title: 'withdraw start ERC20 POS '
Keywords: 'pos client, erc20, approveMax, polygon, sdk'
Description: 'Get started with maticjs'
---

`withdrawStart` method can be used to initiate the withdraw process which will burn the specified amount on child token.

```
const erc20RootToken = posClient.erc20(<root token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = result.getTransactionHash();

const txReceipt = result.getReceipt();

```

store the txHash which will be used to [exit the withdraw process]().
