---
sidebar_position: 2
---

# Deposit ERC20

```js
maticPOSClient.depositERC20ForUser(rootToken, user, amount, options);
```

Deposit given `amount` of `rootToken` for `user` via POS Portal.

- `rootToken` must be valid ERC20 token address
- `user` must be valid account address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

The given amount must be [approved](#pos-approveERC20ForDeposit) for deposit beforehand.
This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

maticPOSClient.depositERC20ForUser('0x718Ca123...', user, '1000000000000000000', {
  from: '0xABc578455...'
})
```

---
