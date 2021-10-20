---
Title: 'withdraw challenge faster ERC20 POS '
Keywords: 'pos client, erc20, withdrawChallengeFaster, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawChallengeFaster

`withdrawChallengeFaster` method can be used to challenge the withdraw process faster by using the txHash from `withdrawStart` method.

It is fast because it generates proof in backend. The backend can be configured with dedicated private rpc.

**Note**- withdrawStart transaction must be checkpointed in order to challenge the withdraw.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawChallengeFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Once the transaction is complete & checkpoint is completed - amount will be deposited to root chain.
