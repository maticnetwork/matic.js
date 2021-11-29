---
Title: 'withdrawExitFaster erc721 POS  '
Keywords: 'pos client, erc721, withdrawExitFaster, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExitFaster

`withdrawExitFaster` method can be used to exit the withdraw process by using the txHash from `withdrawStart` method.

<div class="highlight mb-20px mt-20px">
It is fast because it generates proof in backend. You need to configure <a href="docs/set-proof-api">setProofAPI</a>
</div>

**Note**- withdrawStart transaction must be checkpointed in order to exit the withdraw.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.withdrawExitFaster(<burn tx hash>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
