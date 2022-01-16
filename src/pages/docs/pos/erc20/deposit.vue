<template><Layout title='deposit ERC20 POS ' description='Get started with maticjs' keywords='pos client, erc20, approveMax, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc20/deposit.md'><h1 id="deposit">deposit</h1>
<p><code>deposit</code> method can be used to deposit required amount from root token to child token.</p>
<pre><code>const erc20RootToken = posClient.erc20(&lt;root token address&gt;, true);

//deposit 100 to user address
const result = await erc20Token.deposit(100, &lt;user address&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre>
<p>It might take some time to reflect the deposited amount on polygon chain. You can use <a href="docs/pos/is-deposited">isDeposited</a> method for checking status.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        