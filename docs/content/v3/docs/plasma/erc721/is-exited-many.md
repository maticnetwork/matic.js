---
Title: 'isExitedMany ERC721 plasma'
Keywords: 'plasma client, erc721, isExitedMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# isExitedMany

`isExitedMany` method check if a withdraw has been exited. It returns boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExitedMany(<exit tx hash>);

```
