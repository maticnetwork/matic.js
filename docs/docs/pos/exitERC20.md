---
sidebar_position: 5
---

# Exit ERC20

```js
maticPOSClient.exitERC20(burnTxHash, options);
```

Exit tokens from POS Portal. This can be called after checkpoint has been submitted for the block containing burn tx.

- `burnTxHash` must be valid tx hash for token burn using [burnERC20](#pos-burnERC20).
- `options` see [more infomation here](#approveERC20TokensForDeposit)

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
maticPOSClient.exitERC20("0xabcd...789", {
  from: "0xABc578455...",
});
```

---
