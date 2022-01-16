---
sidebar_position: 1
---

# Approve ERC721 Deposit

```js
maticPOSClient.approveERC721ForDeposit(rootToken, tokenId, options)
```

Approve ERC721 tokens for deposit using POS Portal

- `rootToken` must be valid ERC721 token address
- `tokenId` tokenId for approval (string, not in Number)
- `options` transaction fields, can be skipped if default options are set
  - `from` must be boolean value. For Byte code of transaction, use `from: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

Example:

```js
await maticPOSClient.approveERC721ForDeposit(
  '0x....', // RootToken address,
  '123', // tokenId for approval
  {
    from: config.user.address,
    gasPrice: '500000000000',
    gas: 2500000,
  } // transaction fields, can be skipped if default options are set
)
```

---
