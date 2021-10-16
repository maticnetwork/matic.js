---
Title: 'transfer ERC20 POS'
Keywords: 'POS client, erc20, transfer, polygon, sdk'
Description: 'Transfer erc20 POS tokens'
---

# transfer

`transfer` method can be used to transfer amount from one address to another address.

```
const erc20Token = posClient.erc20(<token address>);

const result = await erc20Token.transfer(<to>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
