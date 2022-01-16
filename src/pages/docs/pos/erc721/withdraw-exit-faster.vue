<template><Layout title='withdrawExitFaster erc721 POS  ' description='Get started with maticjs' keywords='pos client, erc721, withdrawExitFaster, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/withdraw-exit-faster.md'><h1 id="withdrawexitfaster">withdrawExitFaster</h1>
<p><code>withdrawExitFaster</code> method can be used to exit the withdraw process by using the txHash from <code>withdrawStart</code> method.</p>
<div class="highlight mb-20px mt-20px">
It is fast because it generates proof in backend. You need to configure <a href="docs/set-proof-api">setProofAPI</a>
</div>
<p><strong>Note</strong>- withdrawStart transaction must be checkpointed in order to exit the withdraw.</p>
<pre><code>const erc721RootToken = posClient.erc721(&lt;root token address&gt;, true);

const approveResult = await erc721RootToken.withdrawExitFaster(&lt;burn tx hash&gt;);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        