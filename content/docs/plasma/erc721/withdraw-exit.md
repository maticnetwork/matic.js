---
Title: 'withdraw exit erc721 POS '
Keywords: 'pos client, erc721, withdrawExit, polygon, sdk'
Description: 'Get started with maticjs'
---

# withdrawExit

`withdrawExit` method can be used to exit the withdraw process once challenge period has been completed.

```
const erc20RootToken = plasmaClient.erc721(<root token address>, true);

const result = await erc20Token.withdrawExit();

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
