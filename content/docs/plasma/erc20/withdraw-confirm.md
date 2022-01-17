---
Title: 'withdraw challenge ERC20 Plasma '
Keywords: 'plasma client, erc20, withdrawChallenge, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawConfirm

`withdrawConfirm` method is the second step in plasma withdraw process. In this step - proof of your burn transaction (first transaction) is submitted and an erc721 token of equivalent value is created.

After this process is successful - challenge period is started and upon completion of the the challenge period, user can get back the withdrawn amount to their account on the root chain.

The challenge period is 7 days for mainnet.

**Note**- withdrawStart transaction must be checkpointed in order to challenge the withdraw.

```
const erc20Token = plasmaClient.erc20(<token address>, true);

const result = await erc20Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

Once challenge period is completed, `withdrawExit` can be called to exit the withdraw process and get back the withdrawn amount.
