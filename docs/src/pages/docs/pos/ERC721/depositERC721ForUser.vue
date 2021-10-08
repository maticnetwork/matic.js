<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/pos/ERC721/depositERC721ForUser.md'><h1 id="depositerc721">Deposit ERC721</h1>
<pre><code class="js language-js">await maticPOSClient.depositERC721ForUser(
  rootToken, // RootToken address
  user, // User address (in most cases, this will be sender's address),
  tokenId, // tokenId for deposit
  options // transaction fields, can be skipped if default options are set
)
</code></pre>
<p>Deposit tokens into Matic chain using POS Portal.
Remember to call <code>approveERC721ForDeposit</code> before this</p>
<ul>
<li><code>rootToken</code> must be valid ERC721 token address</li>
<li><code>tokenId</code> tokenId for approval (string, not in Number)</li>
<li><code>options</code> transaction fields, can be skipped if default options are set</li>
<li><code>from</code> must be boolean value. For Byte code of transaction, use <code>from: true</code></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        