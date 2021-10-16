---
Title: 'withdraw start ERC20 Plasma '
Keywords: 'plasma client, erc20, approveMax, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawStart

`withdrawStart` method can be used to initiate the withdraw process which will burn the specified amount on child token.

```
const erc20ChildToken = plasmaClient.erc20(<child token address>);

// start withdraw process for 100 amount
const result = await erc20ChildToken.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

store the txHash which will be used to challenge the withdraw process.
