<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/pos/ERC721/approveERC721ForDeposit.md'><h1 id="approveerc721deposit">Approve ERC721 Deposit</h1>
<pre><code class="js language-js">maticPOSClient.approveERC721ForDeposit(rootToken, tokenId, options)
</code></pre>
<p>Approve ERC721 tokens for deposit using POS Portal</p>
<ul>
<li><code>rootToken</code> must be valid ERC721 token address</li>
<li><code>tokenId</code> tokenId for approval (string, not in Number)</li>
<li><code>options</code> transaction fields, can be skipped if default options are set</li>
<li><code>from</code> must be boolean value. For Byte code of transaction, use <code>from: true</code></li>
<li><code>encodeAbi</code> must be boolean value. For Byte code of transaction, use <code>encodeAbi: true</code></li>
</ul>
<p>This returns <code>Promise</code> object, which will be fulfilled when transaction gets confirmed (when receipt is generated).</p>
<p>Example:</p>
<pre><code class="js language-js">await maticPOSClient.approveERC721ForDeposit(
  '0x....', // RootToken address,
  '123', // tokenId for approval
  {
    from: config.user.address,
    gasPrice: '500000000000',
    gas: 2500000,
  } // transaction fields, can be skipped if default options are set
)
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        