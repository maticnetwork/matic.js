---
Title: 'withdrawChallenge erc721 plasma  '
Keywords: 'plasma client, erc721, withdrawChallenge, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawChallenge

`withdrawChallenge` method can be used to challenge the withdraw process.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.withdrawChallenge(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
