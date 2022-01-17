---
Title: 'transfer ERC721 POS'
Keywords: 'pos client, erc721, transfer, polygon, sdk'
Description: 'transfer tokens from one user to another user.'
---

# transfer

`transfer` method can be used to transfer tokens from one user to another user.

```
const erc721Token = posClient.erc721(<token address>);

const result = await erc721Token.transfer(<tokenid>,<from>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
