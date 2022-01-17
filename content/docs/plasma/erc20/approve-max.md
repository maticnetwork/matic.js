---
Title: 'approveMax ERC20 Plasma'
Keywords: 'plasma client, erc20, approveMax, polygon, sdk'
Description: 'Get started with maticjs'
---

# approveMax

`approveMax` method can be used to approve max amount on root token.

```
const erc20RootToken = plasmaClient.erc20(<root token address>, true);

const approveResult = await erc20Token.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
