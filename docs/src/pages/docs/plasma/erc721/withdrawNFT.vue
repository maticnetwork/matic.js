<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/erc721/withdrawNFT.md'><h1 id="withdrawerc721">Withdraw ERC721</h1>
<pre><code class="js language-js">matic.withdrawNFT(txId, options)
</code></pre>
<p>Withdraw tokens on mainchain using <code>txId</code> from <code>startWithdraw</code> method after header has been submitted to mainchain.</p>
<ul>
<li><code>txId</code> must be valid tx hash</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">matic.withdrawNFT('0xabcd...789', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        