---
Title: 'withdrawChallengeFaster erc721 plasma  '
Keywords: 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawConfirmFaster

`withdrawConfirmFaster` method is 2nd step in plasma withdraw process. In this step - proof of your burn transaction (1st transaction) is submitted and an erc721 token of equivalent value will be created.

After the process success - challenge period is started and upon completion of the period, user can get back the withdrawn amount in their account on root chain.

The challenge period is 7 days for mainnet.

<div class="highlight mb-20px mt-20px">
It is fast because it generates proof in backend. You need to configure <a href="v3/docs/set-proof-api">setProofAPI</a>
</div>

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawConfirmFaster(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
