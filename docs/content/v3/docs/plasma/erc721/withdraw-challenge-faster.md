---
Title: 'withdrawChallengeFaster erc721 plasma  '
Keywords: 'plasma client, erc721, withdrawChallengeFaster, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawChallengeFaster

`withdrawChallengeFaster` method can be used to challenge the withdraw process with speed. This is faster as compare to `withdrawChallenge` because it generates proof in backend.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawChallenge(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
