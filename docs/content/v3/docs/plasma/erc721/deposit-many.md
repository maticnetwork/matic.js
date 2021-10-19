---
Title: 'deplasmaitMany erc721 plasma  '
Keywords: 'plasma client, erc721, deplasmaitMany, polygon, sdk'
Description: 'Get started with maticjs'
---

# deplasmaitMany

`deplasmaitMany` method can be used to deplasmait multiple token from ethereum to polygon chain.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.deplasmaitMany([<token id1>,<token id2>], <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
