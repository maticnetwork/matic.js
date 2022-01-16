<template><Layout title='withdraw exit ERC20 POS ' description='Get started with maticjs' keywords='pos client, erc20, withdrawExit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc20/withdraw-exit.md'><h1 id="withdrawexit">withdrawExit</h1>
<p><code>withdrawExit</code> method can be used to exit the withdraw process by using the txHash from <code>withdrawStart</code> method.</p>
<p><strong>Note</strong>- withdrawStart transaction must be checkpointed in order to exit the withdraw.</p>
<pre><code>const erc20RootToken = posClient.erc20(&lt;root token address&gt;, true);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawExit(&lt;burn tx hash&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre>
<p>Once the transaction is complete &amp; checkpoint is completed, amount will be deposited to root chain.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        