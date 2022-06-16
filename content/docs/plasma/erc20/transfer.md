---
Title: 'transfer ERC20 Plasma'
Keywords: 'plasma client, erc20, transfer, polygon, sdk'
Description: 'Transfer erc20 plasma tokens'
---

# Transfer

`transfer` method can be used to transfer amount from one address to another address.

```
const erc20Token = plasmaClient.erc20(<token address>);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();

```

## Transfer MATIC token

MATIC is native token on polygon. So we support transfer of matic tokens without any token address.

```
// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(<amount>,<to>);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
```
