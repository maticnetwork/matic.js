---
sidebar_position: 2
---

# Deposit ERC721

```js
await maticPOSClient.depositERC721ForUser(
  rootToken, // RootToken address
  user, // User address (in most cases, this will be sender's address),
  tokenId, // tokenId for deposit
  options // transaction fields, can be skipped if default options are set
)
```

Deposit tokens into Matic chain using POS Portal.
Remember to call `approveERC721ForDeposit` before this

- `rootToken` must be valid ERC721 token address
- `tokenId` tokenId for approval (string, not in Number)
- `options` transaction fields, can be skipped if default options are set
  - `from` must be boolean value. For Byte code of transaction, use `from: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

---
