---
Title: 'withdrawExitFasterMany erc721 POS  '
Keywords: 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExitFasterMany

`withdrawExitFasterMany` method can be used to approve all tokens.

It is fast because it generates proof in backend. The backend can be configured with dedicated private rpc.

**Note**- withdrawStart transaction must be checkpointed in order to exit the withdraw.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
