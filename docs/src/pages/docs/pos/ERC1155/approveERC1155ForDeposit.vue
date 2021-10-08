<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/pos/ERC1155/approveERC1155ForDeposit.md'><h1 id="approveerc1155deposit">Approve ERC1155 Deposit</h1>
<pre><code class="js language-js">await maticPOSClient.approveERC1155ForDeposit(
  rootToken, // RootToken address,
  options // transaction fields, can be skipped if default options are set
)
</code></pre>
<p>Approve ERC1155 tokens for deposit using POS Portal</p>
<ul>
<li><code>rootToken</code> must be valid ERC1155 token address</li>
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
        