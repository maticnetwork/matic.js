---
Title: 'withdraw start ERC20 POS '
Keywords: 'pos client, erc20, approveMax, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawStart

`withdrawStart` method can be used to initiate the withdraw process which will burn the specified amount on polygon chain.

```
const erc20Token = posClient.erc20(<token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

store the txHash which will be used to [exit the withdraw process]().
