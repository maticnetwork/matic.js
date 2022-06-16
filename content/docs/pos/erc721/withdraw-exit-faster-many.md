---
Title: 'withdrawExitFasterMany erc721 POS  '
Keywords: 'pos client, erc721, withdrawExitFasterMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExitFasterMany

```diff
- 📌 Deprecation Notice
- This method is depricated and not supported in v3.4.0 and later
```

`withdrawExitFasterMany` method can be used to exit the withdraw process by using the txHash from `withdrawStartMany` method.

<div class="highlight mb-20px mt-20px">
It is fast because it generates proof in backend. You need to configure <a href="docs/set-proof-api">setProofAPI</a>
</div>

**Note**- withdrawStart transaction must be checkpointed in order to exit the withdraw.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitFasterMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
