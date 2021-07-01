---
sidebar_position: 3
---

# Deposit Ether

```js
maticPOSClient.depositEtherForUser(rootToken, user, amount, options);
```

Deposit given `amount` of `rootToken` for `user` via POS Portal.

Deposit given `amount` of ETH for `user` via POS Portal.
ETH is an ERC20 token on Matic chain, follow ERC20 [burn](#pos-burnERC20) and [exit](#pos-exitERC20) to withdraw it.

- `user` must be valid account address
- `amount` must be ETH amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
const user = <your-address> or <any-account-address>

maticPOSClient.depositEtherForUser(user, '1000000000000000000', {
  from: '0xABc578455...'
})
```

---
