---
sidebar_position: 4
---

# Exit ERC1155

```js
await maticPOSClient.exitSingleERC1155(
  txHash, // Transaction hash generated from the 'burnSingleERC1155' method
  options // transaction fields, can be skipped if default options are set
)
```

Exit funds from the POS Portal using the Transaction hash generated from the 'burnERC721' method
Can be called after checkpoint has been submitted for the block containing burn tx.

- `txHash` Transaction hash generated from the 'burnERC1155' method
- `options` transaction fields, can be skipped if default options are set
  - `from` must be boolean value. For Byte code of transaction, use `from: true`
  - `encodeAbi` must be boolean value. For Byte code of transaction, use `encodeAbi: true`

This returns `Promise` object, which will be fulfilled when transaction gets confirmed (when receipt is generated).

---
