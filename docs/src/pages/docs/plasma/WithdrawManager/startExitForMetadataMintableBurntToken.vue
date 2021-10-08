<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/WithdrawManager/startExitForMetadataMintableBurntToken.md'><h1 id="exitmetadatamintableburnttokens">Exit Metadata Mintable Burnt Tokens</h1>
<pre><code class="js language-js">matic.withdrawManager.startExitForMetadataMintableBurntToken(burnTxHash, (predicate: address), options)
</code></pre>
<pre><code class="bash language-bash">/**
  * Start an exit for a token with metadata (token uri) that was minted and burnt on the side chain
  * Wrapper over contract call: MintableERC721Predicate.startExitForMetadataMintableBurntToken
  * @param burnTxHash Hash of the burn transaction on Matic
  * @param predicate address of MintableERC721Predicate
  */
</code></pre>
<p>See <a href="https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L66">MintableERC721Predicate.startExitForMetadataMintableBurntToken</a></p>
<pre><code class="js language-js">const burn = await this.maticClient.startWithdrawForNFT(childErc721.address, tokenId)
await this.maticClient.withdrawManager.startExitForMetadataMintableBurntToken(burn.transactionHash, predicate.address)
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        