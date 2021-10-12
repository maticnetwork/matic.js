---
sidebar_position: 3
---

# Transfer ERC1155

```js
matic.transferERC1155Tokens(token, to, tokenIds, values, options)
```

Transfer gives the `values` of `token` with `tokenIds` to `to` user.

- `token` must be valid ERC1155 token address
- `to` must be valid account address
- `tokenIds` must be an array or single value of BN or String
- `values` must be an array or single value of BN or String
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `from` must be valid account address
  - `parent` must be boolean value. For token transfer on Main chain, use `parent: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

#### Example Case

Lets consider a scenario where we want to transfer 2 tokens of id 123, 5 tokens of id 246 and 3 tokens of id 369. The `tokensIds` and `values` parameters that should be passed are `[123, 246, 369]` and `[2, 5, 3]` respectively. The array lengths of both parameters must be equal.

### Single token transfer

```js
const user = <your-address> or <any-account-address>
const to = <destinationAddress>

// For single token transfer
matic.transferERC1155Tokens('0x718Ca123...', to, 123, 2, {
  from: user,

  // For token transfer on Main network
  // parent: true
})
```

### Batch transfer

```js
const user = <your-address> or <any-account-address>
const to = <destinationAddress>

// For batch token transfers
matic.transferERC1155Tokens('0x718Ca123...', to, [123, 246, 369], [2, 5, 3], {
  from: user,

  // For token transfer on Main network
  // parent: true
})
```

---
