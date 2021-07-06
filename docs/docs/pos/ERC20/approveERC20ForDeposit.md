---
sidebar_position: 1
---

# Approve ERC20 Deposit

```js
maticPOSClient.approveERC20ForDeposit(rootToken, amount, options);
```

Approves given `amount` of `rootToken` to POS Portal contract.

- `rootToken` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
maticPOSClient.approveERC20ForDeposit("0x718Ca123...", "1000000000000000000", {
  from: "0xABc578455...",
});
```

---
