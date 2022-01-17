---
sidebar_position: 3
---

# Burn ERC721

```js
await maticPOSClient.burnERC721(
  childToken, // ChildToken address
  tokenId, // tokenId to burn
  options // transaction fields, can be skipped if default options are set
)
```

Burn ERC721 tokens(deposited using POS Portal) on Matic chain and retrieve the Transaction hash

- `childToken` must be valid ERC721 token address
- `tokenId` tokenId for approval (string, not in Number)
- `options` transaction fields, can be skipped if default options are set
  - `from` must be boolean value. For Byte code of transaction, use `from: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

---
