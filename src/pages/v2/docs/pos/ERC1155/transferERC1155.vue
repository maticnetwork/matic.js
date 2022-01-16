<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/ERC1155/transferERC1155.md'><h1 id="transfererc1155">Transfer ERC1155</h1>
<pre><code class="js language-js">matic.transferERC1155Tokens(token, to, tokenIds, values, options)
</code></pre>
<p>Transfer gives the <code>values</code> of <code>token</code> with <code>tokenIds</code> to <code>to</code> user.</p>
<ul>
<li><code>token</code> must be valid ERC1155 token address</li>
<li><code>to</code> must be valid account address</li>
<li><code>tokenIds</code> must be an array or single value of BN or String</li>
<li><code>values</code> must be an array or single value of BN or String</li>
<li><code>options</code> see <a href="#approveERC20TokensForDeposit">more infomation here</a></li>
<li><code>from</code> must be valid account address</li>
<li><code>parent</code> must be boolean value. For token transfer on Main chain, use <code>parent: true</code></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<h4 id="examplecase">Example Case</h4>
<p>Lets consider a scenario where we want to transfer 2 tokens of id 123, 5 tokens of id 246 and 3 tokens of id 369. The <code>tokensIds</code> and <code>values</code> parameters that should be passed are <code>[123, 246, 369]</code> and <code>[2, 5, 3]</code> respectively. The array lengths of both parameters must be equal.</p>
<h3 id="singletokentransfer">Single token transfer</h3>
<pre><code class="js language-js">const user = &lt;your-address&gt; or &lt;any-account-address&gt;
const to = &lt;destinationAddress&gt;

// For single token transfer
matic.transferERC1155Tokens('0x718Ca123...', to, 123, 2, {
  from: user,

  // For token transfer on Main network
  // parent: true
})
</code></pre>
<h3 id="batchtransfer">Batch transfer</h3>
<pre><code class="js language-js">const user = &lt;your-address&gt; or &lt;any-account-address&gt;
const to = &lt;destinationAddress&gt;

// For batch token transfers
matic.transferERC1155Tokens('0x718Ca123...', to, [123, 246, 369], [2, 5, 3], {
  from: user,

  // For token transfer on Main network
  // parent: true
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        