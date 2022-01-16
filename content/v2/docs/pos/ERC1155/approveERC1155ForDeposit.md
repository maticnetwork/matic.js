---
sidebar_position: 1
---

# Approve ERC1155 Deposit

```js
await maticPOSClient.approveERC1155ForDeposit(
  rootToken, // RootToken address,
  options // transaction fields, can be skipped if default options are set
)
```

Approve ERC1155 tokens for deposit using POS Portal

- `rootToken` must be valid ERC1155 token address
- `options` transaction fields, can be skipped if default options are set
  - `from` must be boolean value. For Byte code of transaction, use `from: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

---
