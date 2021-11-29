---
Title: 'withdrawStart erc721 plasma  '
Keywords: 'plasma client, erc721, withdrawStart, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawStart

`withdrawStart` method can be used to initiate the withdraw process which will burn the specified token on polygon chain.

```
const erc721Token = plasmaClient.erc721(<token address>);

const result = await erc721Token.withdrawStart(<token id>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
