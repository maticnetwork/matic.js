---
sidebar_position: 3
---

# Transfer ERC1155

```js
matic.transferERC1155Tokens(token, to, tokenIds, values, options)
```

Transfer given `values` of `token` with `tokenIds` to `to` user.

- `token` must be valid ERC1155 token address
- `to` must be valid account address
- `tokenIds` must be token id/ids of ERC1155 tokens
- `values` must be token amount/amounts to be transferred
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `from` must be valid account address
  - `parent` must be boolean value. For token transfer on Main chain, use `parent: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example: Single token transfer

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

Example: Batch transfers

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
