---
Title: 'withdraw challenge ERC20 Plasma '
Keywords: 'plasma client, erc20, withdrawChallenge, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawChallenge

`withdrawChallenge` method can be used to challenge the withdraw process. The challenge period is 7 days.

**Note**- withdrawStart transaction must be checkpointed in order to challenge the withdraw.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawChallenge(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Once challenge period is completed, `withdrawExit` can be called to exit the withdraw process.
