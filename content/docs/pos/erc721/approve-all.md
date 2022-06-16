---
Title: 'approveAll erc721 POS  '
Keywords: 'pos client, erc721, approveAll, polygon, sdk'
Description: 'Get started with maticjs'
---

# approve

`approveAll` method can be used to approve all tokens.

```
const erc721RootToken = posClient.erc721(<root token address>, true);

const approveResult = await erc721RootToken.approveAll();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
