---
Title: 'getAllTokens ERC721 POS'
Keywords: 'pos client, erc721, getAllTokens, polygon, sdk'
Description: 'Get started with maticjs'
---

# isExited

`isExited` method check if a withdraw has been exited. It returns boolean value.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.isExited(<exit tx hash>);

```

you can also limit the tokens by specifying limit value in second parmater.
