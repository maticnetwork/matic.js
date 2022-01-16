<template><Layout title='isWithdrawExited ERC20 POS ' description='Get started with maticjs' keywords='pos client, erc20, withdrawExit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc20/is-withdraw-exited.md'><h1 id="iswithdrawexited">isWithdrawExited</h1>
<p><code>isWithdrawExited</code> method can be used to know whether the withdraw has been exited or not.</p>
<pre><code>const erc20RootToken = posClient.erc20(&lt;root token address&gt;,true);

// start withdraw process for 100 amount
const isExited = await erc20Token.isWithdrawExited(&lt;burn tx hash&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        