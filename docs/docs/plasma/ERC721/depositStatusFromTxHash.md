---
sidebar_position: 3
---

# Deposit Status From TxHash

After user safe-deposit the ERC721 tokens, they can get the status of the transaction by calling this function using the txHash. 

```js
matic.depositStatusFromTxHash(txHash)
```

Deposit status using `txHash`.

- `txHash` must be valid

This will return a `Promise` object, which will be fulfilled if txHash is valid.

Example:

```js
matic.depositStatusFromTxHash(txHash).then(res => {
  console.log(res)
})
```

---
