---
Title: 'withdrawExitFasterMany erc1155 POS  '
Keywords: 'pos client, erc1155, withdrawExitFasterMany, polygon, sdk'
Description: 'withdrawExitFasterMany method can be used to exit the withdraw process by using the txHash from withdrawStartMany method.'
---

# withdrawExitFasterMany

`withdrawExitFasterMany` method can be used to exit the withdraw process by using the txHash from `withdrawStartMany` method.

<div class="highlight mb-20px mt-20px">
It is fast because it generates proof in backend. You need to configure <a href="docs/set-proof-api">setProofAPI</a>
</div>

**Note**- withdrawStart transaction must be checkpointed in order to exit the withdraw.

```
const erc1155RootToken = posClient.erc1155(<root token address>, true);

const result = await erc1155RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
