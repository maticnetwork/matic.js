---
Title: 'withdraw exit faster ERC20 POS '
Keywords: 'pos client, erc20, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

`withdrawExitFaster` method can be used to exit the withdraw process faster by using the txHash from `withdrawStart` method.

It is fast because it generates proof in backend. The backend can be configured with dedicated private rpc.

**Note**- withdrawStart transaction must be checkpointed in order to exit the withdraw.

```
const erc20RootToken = posClient.erc20(<root token address>);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExitFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Once the transaction is complete & checkpoint is completed - amount will be deposited to root chain.
