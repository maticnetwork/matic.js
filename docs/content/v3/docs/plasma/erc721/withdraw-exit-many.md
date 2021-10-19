---
Title: 'withdrawExitMany erc721 plasma  '
Keywords: 'plasma client, erc721, withdrawExitMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExitMany

`withdrawExitMany` method can be used to approve all tokens.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
