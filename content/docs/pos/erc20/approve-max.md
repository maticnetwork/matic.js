---
Title: 'approveMax ERC20 POS '
Keywords: 'pos client, erc20, approveMax, polygon, sdk'
Description: 'approveMax method can be used to approve max amount on the root token.'
---

# approveMax

`approveMax` method can be used to approve max amount on the root token.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

const approveResult = await erc20RootToken.approveMax();

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```
