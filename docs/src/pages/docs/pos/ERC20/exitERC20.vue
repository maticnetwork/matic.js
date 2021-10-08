<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/pos/ERC20/exitERC20.md'><h1 id="exiterc20">Exit ERC20</h1>
<pre><code class="js language-js">maticPOSClient.exitERC20(burnTxHash, options)
</code></pre>
<p>Exit tokens from POS Portal. This can be called after checkpoint has been submitted for the block containing burn tx.</p>
<ul>
<li><code>burnTxHash</code> must be valid tx hash for token burn using <a href="#pos-burnERC20">burnERC20</a>.</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">maticPOSClient.exitERC20('0xabcd...789', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        