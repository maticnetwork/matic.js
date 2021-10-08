<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/pos/ERC20/approveERC20ForDeposit.md'><h1 id="approveerc20deposit">Approve ERC20 Deposit</h1>
<pre><code class="js language-js">maticPOSClient.approveERC20ForDeposit(rootToken, amount, options)
</code></pre>
<p>Approves given <code>amount</code> of <code>rootToken</code> to POS Portal contract.</p>
<ul>
<li><code>rootToken</code> must be valid ERC20 token address</li>
<li><code>amount</code> must be token amount in wei (string, not in Number)</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">maticPOSClient.approveERC20ForDeposit('0x718Ca123...', '1000000000000000000', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        