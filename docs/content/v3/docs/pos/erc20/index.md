---
Title: 'POS ERC20'
Keywords: 'pos client, erc20, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

# ERC20

`POSClient` provides `erc20` method which helps you to interact with a erc20 token.

## Child token

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Parent token

Parent token can be initiated by providing second parameter value as `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
