---
Title: 'withdrawExitMany erc721 POS  '
Keywords: 'pos client, erc721, withdrawExitMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExitMany

```diff
- 📌 Deprecation Notice
- This method is depricated and not supported in v3.4.0 and later
```

`withdrawExitMany` method can be used to exit the withdraw process by using the txHash from `withdrawStartMany` method.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const result = await erc721RootToken.withdrawExitMany(<burn tx hash>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
