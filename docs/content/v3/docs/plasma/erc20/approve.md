---
Title: 'approve ERC20 Plasma'
Keywords: 'pos client, erc20, approve, polygon, sdk'
Description: 'Get started with maticjs'
---

`erc20` provides `approve` method which can be used to approve required amount on root token.

approve is required in order to deposit amount on polygon chain.

```
const erc20RootToken = plasmaClient.erc20(<root token address>);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = approveResult.getTransactionHash();

const txReceipt = approveResult.getReceipt();

```
