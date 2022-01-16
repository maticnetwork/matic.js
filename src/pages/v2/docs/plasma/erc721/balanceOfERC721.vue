<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/erc721/balanceOfERC721.md'><h1 id="balanceoferc721">Balance Of ERC721</h1>
<pre><code class="js language-js">matic.balanceOfERC721(userAddress, token, options)
</code></pre>
<p>Get balance of ERC721 <code>token</code> for <code>address</code>.</p>
<ul>
<li><code>token</code> must be valid token address</li>
<li><code>userAddress</code> must be valid user address</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>parent</code> must be boolean value. For balance on Main chain, use <code>parent: true</code></li>
</ul>
<p>This returns <code>balance</code>.</p>
<p>Example:</p>
<pre><code class="js language-js">matic
  .balanceOfERC721('0xABc578455...', '0x5E9c4ccB05...', {
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
        