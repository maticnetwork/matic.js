<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/ERC20/burnERC20.md'><h1 id="burnerc20">Burn ERC20</h1>
<pre><code class="js language-js">maticPOSClient.burnERC20(childToken, amount, options)
</code></pre>
<p>Burn given <code>amount</code> of <code>childToken</code> to be exited from POS Portal.</p>
<ul>
<li><code>childToken</code> must be valid ERC20 token address</li>
<li><code>amount</code> must be token amount in wei (string, not in Number)</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">maticPOSClient.burnERC20('0x718Ca123...', '1000000000000000000', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        