---
Title: 'deplasmait erc721 plasma  '
Keywords: 'plasma client, erc721, deplasmait, polygon, sdk'
Description: 'Get started with maticjs'
---

# safeDeposit

`safeDeposit` method can be used to deposit a token from ethereum to polygon chain.

```
const erc721RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc721RootToken.safeDeposit(<token id>, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
