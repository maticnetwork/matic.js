---
sidebar_position: 17
---

### matic.processExits(rootTokenAddress, options)

Call processExits after completion of challenge period, after that withdrawn funds get transfered to your account on mainchain

- `rootTokenAddress` RootToken address
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
matic.processExits("0xabcd...789", {
  from: "0xABc578455...",
});
```

---
