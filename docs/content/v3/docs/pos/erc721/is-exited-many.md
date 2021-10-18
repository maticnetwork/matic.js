---
Title: 'isExitedMany ERC721 POS'
Keywords: 'pos client, erc721, isExitedMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# isExitedMany

`isExitedMany` method check if a withdraw has been exited. It returns boolean value.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
