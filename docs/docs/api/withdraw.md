---
sidebar_position: 15
---

### matic.withdraw(txId, options)

Withdraw tokens on mainchain using `txId` from `startWithdraw` method after header has been submitted to mainchain.

- `txId` must be valid tx hash
- `options` see [more infomation here](#approveERC20TokensForDeposit)

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.withdraw("0xabcd...789", {
  from: "0xABc578455...",
});
```

---
