<template><Layout title='transfer ERC20 Plasma' description='Transfer erc20 plasma tokens' keywords='plasma client, erc20, transfer, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc20/transfer.md'><h1 id="transfer">Transfer</h1>
<p><code>transfer</code> method can be used to transfer amount from one address to another address.</p>
<pre><code>const erc20Token = plasmaClient.erc20(&lt;token address&gt;);

const result = await erc20Token.transfer(&lt;amount&gt;,&lt;to&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre>
<h2 id="transfermatictoken">Transfer MATIC token</h2>
<p>MATIC is native token on polygon. So we support transfer of matic tokens without any token address.</p>
<pre><code>// initialize token with null means use MATIC tokens
const erc20Token = plasmaClient.erc20(null);

const result = await erc20Token.transfer(&lt;amount&gt;,&lt;to&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        