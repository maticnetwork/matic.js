<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/ERC721/burnERC721.md'><h1 id="burnerc721">Burn ERC721</h1>
<pre><code class="js language-js">await maticPOSClient.burnERC721(
  childToken, // ChildToken address
  tokenId, // tokenId to burn
  options // transaction fields, can be skipped if default options are set
)
</code></pre>
<p>Burn ERC721 tokens(deposited using POS Portal) on Matic chain and retrieve the Transaction hash</p>
<ul>
<li><code>childToken</code> must be valid ERC721 token address</li>
<li><code>tokenId</code> tokenId for approval (string, not in Number)</li>
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
        