---
Title: 'POS ERC721'
Keywords: 'pos client, erc721, contract, polygon, sdk'
Description: 'Get started with maticjs'
---

# ERC721

`POSClient` provides `erc721` method which helps you to interact with a erc721 token.

The method returns an object which has various methods.

```
const erc721token = posClient.erc721(<token address>,<isRoot>);
```

## Child token

Token on polygon can be initiated by using this syntax -

```
const childERC20Token = posClient.erc721(<child token address>);
```

## Parent token

Token on ethereum can be initiated by providing second parameter value as `true`.

```
const parentERC20Token = posClient.erc721(<parent token address>, true);
```
