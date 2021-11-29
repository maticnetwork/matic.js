---
Title: 'getAllTokens ERC721 POS'
Keywords: 'pos client, erc721, getAllTokens, polygon, sdk'
Description: 'Get started with maticjs'
---

# getAllTokens

`getAllTokens` method returns all tokens owened by specified user.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.getAllTokens(<user address>, <limit>);

```

you can also limit the tokens by specifying limit value in second parmater.
