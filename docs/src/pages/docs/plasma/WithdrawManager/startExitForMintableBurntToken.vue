<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/WithdrawManager/startExitForMintableBurntToken.md'><h1 id="exitmintableburnttokens">Exit Mintable Burnt Tokens</h1>
<pre><code class="js language-js">matic.withdrawManager.startExitForMintableBurntToken(burnTxHash, (predicate: address), options)
</code></pre>
<pre><code class="bash language-bash">/**
 * Start an exit for a token that was minted and burnt on the side chain
 * Wrapper over contract call: MintableERC721Predicate.startExitForMintableBurntToken
 * @param burnTxHash Hash of the burn transaction on Matic
 * @param predicate address of MintableERC721Predicate
 */
</code></pre>
<p>See <a href="https://github.com/maticnetwork/contracts/blob/e2cb462b8487921463090b0bdcdd7433db14252b/contracts/root/predicates/MintableERC721Predicate.sol#L31">MintableERC721Predicate.startExitForMintableBurntToken</a></p>
<pre><code class="js language-js">const burn = await this.maticClient.startWithdrawForNFT(childErc721.address, tokenId)
await this.maticClient.withdrawManager.startExitForMintableBurntToken(burn.transactionHash, predicate.address)
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        