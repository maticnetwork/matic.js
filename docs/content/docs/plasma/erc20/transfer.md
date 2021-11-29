---
Title: 'transfer ERC20 Plasma'
Keywords: 'plasma client, erc20, transfer, polygon, sdk'
Description: 'Transfer erc20 plasma tokens'
---

# transfer

`transfer` method can be used to transfer amount from one address to another address.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<to>,<amount>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```
