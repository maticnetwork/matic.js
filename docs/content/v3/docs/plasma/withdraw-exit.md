---
Title: 'withdraw exit Plasma'
Keywords: 'plasma client, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExit

`withdrawExit` method can be used to exit the withdraw process once challenge period has been completed.

```
const result = plasmaClient.withdrawExit(<token | tokens[]>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

You can also exit for multiple tokens by providing tokens list in array.
