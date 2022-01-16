<template><Layout title='isWithdrawExited ERC721 POS' description='Get started with maticjs' keywords='pos client, erc721, isWithdrawExited, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/is-withdraw-exited.md'><h1 id="iswithdrawexited">isWithdrawExited</h1>
<p><code>isWithdrawExited</code> method check if a withdraw has been exited. It returns boolean value.</p>
<pre><code>const erc721Token = posClient.erc721(&lt;token address&gt;);

const result = await erc721Token.isWithdrawExited(&lt;exit tx hash&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        