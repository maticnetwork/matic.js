---
Title: 'isWithdrawExited ERC721 POS'
Keywords: 'pos client, erc721, isWithdrawExited, polygon, sdk'
Description: 'Get started with maticjs'
---

# isWithdrawExited

`isWithdrawExited` method check if a withdraw has been exited. It returns boolean value.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isWithdrawExited(<exit tx hash>);

```
