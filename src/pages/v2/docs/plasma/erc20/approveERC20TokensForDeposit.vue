<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/erc20/approveERC20TokensForDeposit.md'><h1 id="approveerc20deposit">Approve ERC20 Deposit</h1>
<pre><code class="js language-js">matic.approveERC20TokensForDeposit(token, amount, options)
</code></pre>
<p>Approves given <code>amount</code> of <code>token</code> to <code>rootChainContract</code>.</p>
<ul>
<li><code>token</code> must be valid ERC20 token address</li>
<li><code>amount</code> must be token amount in wei (string, not in Number)</li>
<li><code>options</code> (optional) must be valid javascript object containing <code>from</code>, <code>gasPrice</code>, <code>gasLimit</code>, <code>nonce</code>, <code>value</code>, <code>onTransactionHash</code>, <code>onReceipt</code> or <code>onError</code></li>
<li><code>from</code> must be valid account address(required)</li>
<li><code>gasPrice</code> same as Ethereum <code>sendTransaction</code></li>
<li><code>gasLimit</code> same as Ethereum <code>sendTransaction</code></li>
<li><code>nonce</code> same as Ethereum <code>sendTransaction</code></li>
<li><code>value</code> contains ETH value. Same as Ethereum <code>sendTransaction</code>.
This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</li>
</ul>
<p>Example:</p>
<pre><code class="js language-js">matic.approveERC20TokensForDeposit('0x718Ca123...', '1000000000000000000', {
  from: '0xABc578455...',
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        