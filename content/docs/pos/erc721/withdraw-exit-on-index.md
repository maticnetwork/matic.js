---
Title: 'withdrawExitOnIndex erc721 POS  '
Keywords: 'pos client, erc721, withdrawExitOnIndex, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExitOnIndex

```diff
+ 📌 New Method
+ This method is supported in v3.4.0 and later
```

`withdrawExitOnIndex` method can be used to exit a particular token in the burn transaction after `withdrawStartMany`.
The index of the token id in the tokenIds list of the burn transaction is used to indicate the token to be withdrawn.

```
const erc721RootToken = posClient.erc721(<root token address>, true);
const result = await erc721RootToken.withdrawExitOnIndex(<burn tx hash>, <tokenIndex>);
const txHash = await result.getTransactionHash();
const txReceipt = await result.getReceipt();
```
