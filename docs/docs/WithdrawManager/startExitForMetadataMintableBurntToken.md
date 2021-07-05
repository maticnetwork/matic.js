---
sidebar_position: 2
---

# Exit Metadata Mintable Burnt Tokens

```js
matic.withdrawManager.startExitForMetadataMintableBurntToken(burnTxHash, predicate: address, options)
```

```bash
/**
  * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
  * Wrapper over contract call: MintableERC721Predicate.startExitForMetadataMintableBurntToken
  * @param burnTxHash Hash of the burn transaction on Matic
  * @param predicate address of MintableERC721Predicate
  */
```

See [MintableERC721Predicate.startExitForMetadataMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66)

```js
const burn = await this.maticClient.startWithdrawForNFT(
  childErc721.address,
  tokenId
);
await this.maticClient.withdrawManager.startExitForMetadataMintableBurntToken(
  burn.transactionHash,
  predicate.address
);
```

---
