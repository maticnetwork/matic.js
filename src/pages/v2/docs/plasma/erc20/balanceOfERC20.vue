<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/erc20/balanceOfERC20.md'><h1 id="balanceoferc20">Balance of ERC20</h1>
<pre><code class="js language-js">matic.balanceOfERC20(userAddress, token, options)
</code></pre>
<p>Get balance of ERC20 <code>token</code> for <code>address</code>.</p>
<ul>
<li><code>token</code> must be valid token address</li>
<li><code>userAddress</code> must be valid user address</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>parent</code> must be boolean value. For balance on Main chain, use <code>parent: true</code></li>
</ul>
<p>This returns <code>balance</code>.</p>
<p>Example:</p>
<pre><code class="js language-js">matic
  .balanceOfERC20('0xABc578455...', '0x5E9c4ccB05...', {
    from: '0xABc578455...',
  })
  .then(balance =&gt; {
    console.log('balance', balance)
  })
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        