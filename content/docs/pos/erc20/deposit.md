---
Title: 'deposit ERC20 POS '
Keywords: 'pos client, erc20, approveMax, polygon, sdk'
Description: 'deposit method can be used to deposit required amount from root token to child token.'
---

# deposit

`deposit` method can be used to deposit required amount from root token to child token.

```
const erc20RootToken = posClient.erc20(<root token address>, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, <user address>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

It might take some time to reflect the deposited amount on polygon chain. You can use [isDeposited](docs/pos/is-deposited) method for checking status.
