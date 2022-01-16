<template><Layout title='withdraw start ERC20 POS ' description='Get started with maticjs' keywords='pos client, erc20, approveMax, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc20/withdraw-start.md'><h1 id="withdrawstart">withdrawStart</h1>
<p><code>withdrawStart</code> method can be used to initiate the withdraw process which will burn the specified amount on polygon chain.</p>
<pre><code>const erc20Token = posClient.erc20(&lt;token address&gt;);

// start withdraw process for 100 amount
const result = await erc20Token.withdrawStart(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre>
<p>store the txHash which will be used to [exit the withdraw process]().</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        