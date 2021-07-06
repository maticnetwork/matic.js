---
sidebar_position: 4
---

# Burn ERC20

```js
maticPOSClient.burnERC20(childToken, amount, options);
```

Burn given `amount` of `childToken` to be exited from POS Portal.

- `childToken` must be valid ERC20 token address
- `amount` must be token amount in wei (string, not in Number)
- `options` see [more infomation here](#approveERC20TokensForDeposit)
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
maticPOSClient.burnERC20("0x718Ca123...", "1000000000000000000", {
  from: "0xABc578455...",
});
```

---
