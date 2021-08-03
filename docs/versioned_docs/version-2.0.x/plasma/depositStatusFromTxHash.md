---
sidebar_position: 5
---

# Deposit Status From TxHash

After user safe-deposit the ERC721 tokens, they can get the status of the transaction by calling this function using the txHash.

```js
matic.depositStatusFromTxHash(txHash)
```

Deposit status using `txHash`.

- `txHash` must be valid

This returns `Promise` object, which resolves to a tx deposit receipt object, if txHash is valid.

Example:

```js
matic.depositStatusFromTxHash(txHash).then(res => {
  console.log(res)
})
```

---
