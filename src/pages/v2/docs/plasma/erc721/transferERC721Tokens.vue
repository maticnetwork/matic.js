<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/erc721/transferERC721Tokens.md'><h1 id="transfererc721">Transfer ERC721</h1>
<pre><code class="js language-js">matic.transferERC721Tokens(token, user, tokenId, options)
</code></pre>
<p>Transfer given <code>tokenId</code> of <code>token</code> to <code>user</code>.</p>
<ul>
<li><code>token</code> must be valid ERC721 token address</li>
<li><code>user</code> must be value account address</li>
<li><code>tokenId</code> must be token amount in wei (string, not in Number)</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>parent</code> must be boolean value. For token transfer on Main chain, use <code>parent: true</code></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">const user = &lt;your-address&gt; or &lt;any-account-address&gt;

matic.transferERC721Tokens('0x718Ca123...', user, '100006500000000000000', {
  from: '0xABc578455...',

  // For token transfer on Main network
  // parent: true
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        