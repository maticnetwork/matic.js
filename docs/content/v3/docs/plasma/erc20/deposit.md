---
Title: 'deposit ERC20 Plasma'
Keywords: 'pos client, erc20, approveMax, polygon, sdk'
Description: 'Get started with maticjs'
---

`erc20` provides `deposit` method which can be used to deposit required amount from root token to child token.

```
const erc20RootToken = plasmaClient.erc20(<root token address>);

//deposit 100 to user address
const approveResult = await erc20Token.deposit(100, <user address>);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();

```

Once deposit transaction is successful - the deposited balance will be added on polygon chain.
