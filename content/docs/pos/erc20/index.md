---
Title: 'POS ERC20'
Keywords: 'pos client, erc20, contract, polygon, sdk'
Description: 'POSClient provides erc20 method which helps you to interact with an erc20 token.'
---

# ERC20

`POSClient` provides `erc20` method which helps you to interact with an **ERC20** token.

The method returns an object which has other various methods.

```
const erc20token = posClient.erc20(<token address>,<isRoot>);
```

Passing second arguments for `isRoot` is optional.

## Child token

Token on polygon can be initiated by using this syntax -

```
const childERC20Token = posClient.erc20(<child token address>);
```

## Parent token

Token on ethereum can be initiated by providing the second parameter value as `true`.

```
const parentERC20Token = posClient.erc20(<parent token address>, true);
```
