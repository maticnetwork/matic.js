---
sidebar_position: 4
---

# Transfer ERC20

```js
matic.transferERC20Tokens(token, user, amount, options)
```

Transfer given `amount` of `token` to `user`.

- `token` must be valid ERC20 token address
- `user` must be value account address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `parent` must be boolean value. For token transfer on Main chain, use `parent: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>
matic.transferERC20Tokens('0x718Ca123...', user, '1000000000000000000', {
  from: '0xABc578455...',
  // For token transfer on Main network
  // parent: true
})
```

---
