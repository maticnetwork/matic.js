---
sidebar_position: 5
---

### matic.depositEthers(amount, options)

Deposit `options.value`

- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit).
  - `from` must be valid account address(required)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.depositEthers(amount, {
  from: "0xABc578455...",
});
```

---
