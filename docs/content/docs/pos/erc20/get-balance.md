---
Title: 'getBalance ERC20 POS  '
Keywords: 'pos client, erc20, getBalance, polygon, sdk'
Description: 'Get started with maticjs'
---

# getBalance

`getBalance` method can be used to get the balance of user. It is available on both child and parent token.

```
const erc20Token = posClient.erc20(<token address>);

// get balance of user
const balance = await erc20Token.getBalance(<userAddress>);
```
