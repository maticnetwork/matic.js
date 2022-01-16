<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/ERC1155/burnERC1155.md'><p>Burn ERC1155 tokens(deposited using POS Portal) on Matic chain and retrieve the Transaction hash</p>
<h1 id="burnsingleerc1155">Burn Single ERC1155</h1>
<pre><code class="js language-js">await maticPOSClient.burnSingleERC1155(
  childToken, // ChildToken address
  tokenId, // tokenId to burn
  amount, // amount of tokenId to burn
  options // transaction fields, can be skipped if default options are set
)
</code></pre>
<h1 id="burnbatcherc1155">Burn Batch ERC1155</h1>
<pre><code class="js language-js">await maticPOSClient.burnBatchERC1155(
  childToken, // ChildToken address
  tokenIds, // array of tokenIds to burn
  amounts, // array of amounts corresponding to to each tokenId
  options // transaction fields, can be skipped if default options are set
)
</code></pre>
<ul>
<li><code>childToken</code> must be valid ERC1155 token address</li>
<li><code>tokenId</code> tokenId for approval (string, not in Number)</li>
<li><code>amounts</code> array of amounts corresponding to to each tokenId</li>
<li><code>options</code> transaction fields, can be skipped if default options are set</li>
<li><code>from</code> must be boolean value. For Byte code of transaction, use <code>from: true</code></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        