<template><Layout title='transfer ERC20 POS' description='Transfer erc20 POS tokens' keywords='POS client, erc20, transfer, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc20/transfer.md'><h1 id="transfer">transfer</h1>
<p><code>transfer</code> method can be used to transfer amount from one address to another address.</p>
<pre><code>const erc20Token = posClient.erc20(&lt;token address&gt;);

const result = await erc20Token.transfer(&lt;amount&gt;,&lt;to&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        