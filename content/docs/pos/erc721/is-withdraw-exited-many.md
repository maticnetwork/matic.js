---
Title: 'isWithdrawExitedMany ERC721 POS'
Keywords: 'pos client, erc721, isWithdrawExitedMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# isWithdrawExitedMany

```diff
- 📌 Deprecation Notice
- This method is depricated and not supported in v3.4.0 and later
```

`isWithdrawExitedMany` method check if withdraw has been exited for multiple tokens. It returns boolean value.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExitedMany(<exit tx hash>);

```
