<template><Layout title='approve ERC20 Plasma' description='Get started with maticjs' keywords='pos client, erc20, approve, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/approve.md'><h1 id="approve">approve</h1>
<p><code>approve</code> method can be used to approve required amount on root token.</p>
<p>approve is required in order to deposit amount on polygon chain.</p>
<pre><code>const erc20RootToken = plasmaClient.erc20(&lt;root token address&gt;, true);

// approve 100 amount
const approveResult = await erc20Token.approve(100);

const txHash = await approveResult.getTransactionHash();

const txReceipt = await approveResult.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        