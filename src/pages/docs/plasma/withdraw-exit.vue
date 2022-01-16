<template><Layout title='withdraw exit Plasma' description='Get started with maticjs' keywords='plasma client, withdrawExit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/withdraw-exit.md'><h1 id="withdrawexit">withdrawExit</h1>
<p>In plasma withdaw process can be exited by anyone using <code>withdrawExit</code> method. The exit process will work only after challenge period has been completed.</p>
<pre><code>const result = plasmaClient.withdrawExit(&lt;token | tokens[]&gt;);

const txHash = await result.getTransactionHash();

const txReceipt = await result.getReceipt();
</code></pre>
<p>You can also exit for multiple tokens by providing tokens list in array.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        