<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/erc721/startWithdrawForNFT.md'><h1 id="startwithdrawfornft">Start Withdraw For NFT</h1>
<pre><code class="js language-js">matic.startWithdrawForNFT(token, tokenId, options)
</code></pre>
<p>Start withdraw process with given <code>tokenId</code> for <code>token</code>.</p>
<ul>
<li><code>token</code> must be valid ERC721 token address</li>
<li><code>tokenId</code> must be token tokenId (string, not in Number)</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">matic.startWithdrawForNFT('0x718Ca123...', '1000000000000000000', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        