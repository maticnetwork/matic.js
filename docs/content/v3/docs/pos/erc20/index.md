---
Title: 'POS ERC20'
Keywords: 'pos client, erc20, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

# ERC20

`POSClient` provides `erc20` method which helps you to interact with a erc20 token.

The method returns an object which has various methods.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

## Child token

Token on polygon can be initiated by using this syntax -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Parent token

Token on ethereum can be initiated by providing second parameter value as `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
