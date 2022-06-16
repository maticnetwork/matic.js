---
sidebar_position: 2
---

# Deposit ERC1155

```js
await maticPOSClient.depositSingleERC1155ForUser(
  rootToken, // RootToken address
  user, // User address (in most cases, this will be sender's address),
  tokenId, // tokenId for deposit
  amount, // amount of tokenId for deposit
  data, // optional bytes data field
  options // transaction fields, can be skipped if default options are set
)
```

Deposit tokens into Matic chain using POS Portal.
Remember to call `approveERC1155ForDeposit` before this

- `rootToken` must be valid ERC1155 token address
- `user` User address (in most cases, this will be sender's address)
- `tokenId` tokenId for approval (string, not in Number)
- `amount` amount of tokenId for deposit
- `data` optional bytes data field
- `options` transaction fields, can be skipped if default options are set
  - `from` must be boolean value. For Byte code of transaction, use `from: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

---
