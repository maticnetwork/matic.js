---
sidebar_position: 3
---

Burn ERC1155 tokens(deposited using POS Portal) on Matic chain and retrieve the Transaction hash

# Burn Single ERC1155

```js
await maticPOSClient.burnSingleERC1155(
  childToken, // ChildToken address
  tokenId, // tokenId to burn
  amount, // amount of tokenId to burn
  options // transaction fields, can be skipped if default options are set
)
```

# Burn Batch ERC1155

```js
await maticPOSClient.burnBatchERC1155(
  childToken, // ChildToken address
  tokenIds, // array of tokenIds to burn
  amounts, // array of amounts corresponding to to each tokenId
  options // transaction fields, can be skipped if default options are set
)
```

- `childToken` must be valid ERC1155 token address
- `tokenId` tokenId for approval (string, not in Number)
- `amounts` array of amounts corresponding to to each tokenId
- `options` transaction fields, can be skipped if default options are set
  - `from` must be boolean value. For Byte code of transaction, use `from: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

---
