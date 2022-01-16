<template><Layout title='isWithdrawExitedMany ERC721 POS' description='Get started with maticjs' keywords='pos client, erc721, isWithdrawExitedMany, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc721/is-withdraw-exited-many.md'><h1 id="iswithdrawexitedmany">isWithdrawExitedMany</h1>
<p><code>isWithdrawExitedMany</code> method check if withdraw has been exited for multiple tokens. It returns boolean value.</p>
<pre><code>const erc721Token = posClient.erc721(&lt;token address&gt;);

const result = await erc721Token.isWithdrawExitedMany(&lt;exit tx hash&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        