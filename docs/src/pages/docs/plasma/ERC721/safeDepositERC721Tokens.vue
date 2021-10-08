<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/ERC721/safeDepositERC721Tokens.md'><h1 id="safedepositerc721">Safe Deposit ERC721</h1>
<pre><code class="js language-js">matic.safeDepositERC721Tokens(token, tokenId, options)
</code></pre>
<p>Deposit given <code>TokenID</code> of <code>token</code> with user <code>user</code>.</p>
<ul>
<li><code>token</code> must be valid ERC20 token address</li>
<li><code>tokenId</code> must be valid token ID</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">matic.safeDepositERC721Tokens('0x718Ca123...', '70000000000', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        