<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/ERC1155/depositERC1155ForUser.md'><h1 id="depositerc1155">Deposit ERC1155</h1>
<pre><code class="js language-js">await maticPOSClient.depositSingleERC1155ForUser(
  rootToken, // RootToken address
  user, // User address (in most cases, this will be sender's address),
  tokenId, // tokenId for deposit
  amount, // amount of tokenId for deposit
  data, // optional bytes data field
  options // transaction fields, can be skipped if default options are set
)
</code></pre>
<p>Deposit tokens into Matic chain using POS Portal.
Remember to call <code>approveERC1155ForDeposit</code> before this</p>
<ul>
<li><code>rootToken</code> must be valid ERC1155 token address</li>
<li><code>user</code> User address (in most cases, this will be sender's address)</li>
<li><code>tokenId</code> tokenId for approval (string, not in Number)</li>
<li><code>amount</code> amount of tokenId for deposit</li>
<li><code>data</code> optional bytes data field</li>
<li><code>options</code> transaction fields, can be skipped if default options are set</li>
<li><code>from</code> must be boolean value. For Byte code of transaction, use <code>from: true</code></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        