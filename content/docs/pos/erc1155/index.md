---
Title: 'POS ERC1155'
Keywords: 'pos client, erc1155, contract, polygon, sdk'
Description: 'Interact with erc1155 token using matic.js'
---

# ERC1155

`POSClient` provides `erc1155` method which helps you to interact with a erc1155 token.

The method returns instance of **ERC1155** class which contains different methods.

```
const erc721token = posClient.erc1155(<token address>, <isRoot>);
```

Passing second arguments for `isRoot` is optional.

## Child token

Token on polygon can be initiated by using this syntax -

```
const childERC20Token = posClient.erc1155(<child token address>);
```

## Parent token

Token on ethereum can be initiated by providing second parameter value as `true`.

```
const parentERC20Token = posClient.erc1155(<parent token address>, true);
```
