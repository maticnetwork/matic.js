<template><Layout title='deposit ether POS' description='Get started with maticjs' keywords='pos client, depositEther, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/deposit-ether.md'><h1 id="depositether">depositEther</h1>
<p><code>depositEther</code> method can be used to deposit required amount of <strong>ether</strong> from ethereum to polygon.</p>
<pre><code>const result = await posClient.depositEther(100);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        