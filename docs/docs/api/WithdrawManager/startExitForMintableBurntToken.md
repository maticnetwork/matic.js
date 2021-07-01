---
sidebar_position: 1
---

# Exit Mintable Burnt Tokens

```js
matic.withdrawManager.startExitForMintableBurntToken(burnTxHash, predicate: address, options)
```

```bash
/**
 * Start an exit for a token that was minted and burnt on the side chain
 * Wrapper over contract call: MintableERC721Predicate.startExitForMintableBurntToken
 * @param burnTxHash Hash of the burn transaction on Matic
 * @param predicate address of MintableERC721Predicate
 */
```

See [MintableERC721Predicate.startExitForMintableBurntToken](https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31)

```js
const burn = await this.maticClient.startWithdrawForNFT(
  childErc721.address,
  tokenId
);
await this.maticClient.withdrawManager.startExitForMintableBurntToken(
  burn.transactionHash,
  predicate.address
);
```

---
