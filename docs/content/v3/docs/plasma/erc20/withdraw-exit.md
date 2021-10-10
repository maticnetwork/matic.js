---
Title: 'withdraw exit ERC20 POS '
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

`withdrawExit` method can be used to exit the withdraw process once challenge period has been completed.

```
const erc20RootToken = plasmaClient.erc20(<root token address>);

const result = await erc20Token.withdrawExit();

const txHash = result.getTransactionHash();

const txReceipt = result.getReceipt();

```

Once the transaction is complete & checkpoint is completed - amount will be deposited to root chain.
