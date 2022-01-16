<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/ERC721/exitERC721.md'><h1 id="exiterc721">Exit ERC721</h1>
<pre><code class="js language-js">await maticPOSClient.exitERC721(
  txHash, // Transaction hash generated from the 'burnERC721' method
  options // transaction fields, can be skipped if default options are set
)
</code></pre>
<p>Exit funds from the POS Portal using the Transaction hash generated from the 'burnERC721' method
Can be called after checkpoint has been submitted for the block containing burn tx.</p>
<ul>
<li><code>txHash</code> Transaction hash generated from the 'burnERC721' method</li>
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
        