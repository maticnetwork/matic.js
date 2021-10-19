---
Title: 'isExited ERC721 plasma'
Keywords: 'plasma client, erc721, isExited, polygon, sdk'
Description: 'Get started with maticjs'
---

# isExited

`isExited` method check if a withdraw has been exited. It returns boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```
