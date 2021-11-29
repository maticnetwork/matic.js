---
Title: 'isApproved ERC721 plasma'
Keywords: 'plasma client, erc721, isApproved, polygon, sdk'
Description: 'Get started with maticjs'
---

# isApproved

`isApproved` method checks if token is approved for specified tokenId. It returns boolean value.

```
const erc721Token = plasmaClient.erc721(<token address>, true);

const result = await erc721Token.isApproved(<tokenId>);

```
