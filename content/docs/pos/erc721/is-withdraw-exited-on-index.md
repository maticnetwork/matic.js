---
Title: 'isWithdrawExitedOnIndex ERC721 POS'
Keywords: 'pos client, erc721, isWithdrawExitedOnIndex, polygon, sdk'
Description: 'Get started with maticjs'
---

# isWithdrawExitedMany

```diff
+ 📌 New Method
+ This method is supported in v3.4.0 and later
```

`isWithdrawExitedOnIndex` method check if withdraw has been exited for a token at mentioned index of a burn transaction. It returns boolean value.

```
const erc721Token = posClient.erc721(<token address>);
const result = await erc721Token.isWithdrawExitedOnIndex(<burn tx hash>, <tokenIndex>);
```
