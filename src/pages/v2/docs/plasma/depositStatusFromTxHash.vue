<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/v2/docs/plasma/depositStatusFromTxHash.md'><h1 id="depositstatusfromtxhash">Deposit Status From TxHash</h1>
<p>After user safe-deposit the ERC721 tokens, they can get the status of the transaction by calling this function using the txHash.</p>
<pre><code class="js language-js">matic.depositStatusFromTxHash(txHash)
</code></pre>
<p>Deposit status using <code>txHash</code>.</p>
<ul>
<li><code>txHash</code> must be valid</li>
</ul>
<p>This returns <code>Promise</code> object, which resolves to a tx deposit receipt object, if txHash is valid.</p>
<p>Example:</p>
<pre><code class="js language-js">matic.depositStatusFromTxHash(txHash).then(res =&gt; {
  console.log(res)
})
</code></pre>
<hr /></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/v2/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        