---
Title: 'withdrawChallenge erc721 plasma  '
Keywords: 'plasma client, erc721, withdrawChallenge, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawConfirm

`withdrawConfirm` method is the second step in plasma withdraw process. In this step, proof of your burn transaction (first transaction) is submitted and an erc721 token of equivalent value is created.

After this process is successful, challenge period is started and upon completion of the the challenge period, user can get back the withdrawn amount in their account on root chain.

The challenge period is 7 days for mainnet.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirm(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
