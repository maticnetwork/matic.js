---
Title: 'isWithdrawExitedMany erc1155 POS'
Keywords: 'pos client, erc1155, isWithdrawExitedMany, polygon, sdk'
Description: 'isWithdrawExitedMany method check if withdraw has been exited for multiple tokens.'
---

# isWithdrawExitedMany

`isWithdrawExitedMany` method check if withdraw has been exited for multiple tokens. It returns boolean value.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExitedMany(<exit tx hash>);

```
