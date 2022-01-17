---
Title: 'isWithdrawExited erc1155 POS'
Keywords: 'pos client, erc1155, isWithdrawExited, polygon, sdk'
Description: 'isWithdrawExited method check if a withdraw has been exited'
---

# isWithdrawExited

`isWithdrawExited` method check if a withdraw has been exited. It returns boolean value.

```
const erc1155Token = posClient.erc1155(<token address>);

const result = await erc1155Token.isWithdrawExited(<exit tx hash>);

```
