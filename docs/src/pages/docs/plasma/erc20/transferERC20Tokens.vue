<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/plasma/erc20/transferERC20Tokens.md'><h1 id="transfererc20">Transfer ERC20</h1>
<pre><code class="js language-js">matic.transferERC20Tokens(token, user, amount, options)
</code></pre>
<p>Transfer given <code>amount</code> of <code>token</code> to <code>user</code>.</p>
<ul>
<li><code>token</code> must be valid ERC20 token address</li>
<li><code>user</code> must be value account address</li>
<li><code>amount</code> must be token amount in wei (string, not in Number)</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>parent</code> must be boolean value. For token transfer on Main chain, use <code>parent: true</code></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">const user = &lt;your-address&gt; or &lt;any-account-address&gt;
matic.transferERC20Tokens('0x718Ca123...', user, '1000000000000000000', {
  from: '0xABc578455...',
  // For token transfer on Main network
  // parent: true
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        