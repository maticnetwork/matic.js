<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/depositEtherForUser.md'><h1 id="depositethers">Deposit Ethers</h1>
<pre><code class="js language-js">maticPOSClient.depositEtherForUser(rootToken, user, amount, options)
</code></pre>
<p>Deposit given <code>amount</code> of <code>rootToken</code> for <code>user</code> via POS Portal.</p>
<p>Deposit given <code>amount</code> of ETH for <code>user</code> via POS Portal.
ETH is an ERC20 token on Matic chain, follow ERC20 <a href="#pos-burnERC20">burn</a> and <a href="#pos-exitERC20">exit</a> to withdraw it.</p>
<ul>
<li><code>user</code> must be valid account address</li>
<li><code>amount</code> must be ETH amount in wei (string, not in Number)</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">const user = &lt;your-address&gt; or &lt;any-account-address&gt;

maticPOSClient.depositEtherForUser(user, '1000000000000000000', {
  from: '0xABc578455...'
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        