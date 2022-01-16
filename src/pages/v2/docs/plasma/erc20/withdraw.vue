<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/erc20/withdraw.md'><h1 id="withdrawerc20">Withdraw ERC20</h1>
<pre><code class="js language-js">matic.withdraw(txId, options)
</code></pre>
<p>Withdraw tokens on mainchain using <code>txId</code> from <code>startWithdraw</code> method after header has been submitted to mainchain.</p>
<ul>
<li><code>txId</code> must be valid tx hash</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">matic.withdraw('0xabcd...789', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        