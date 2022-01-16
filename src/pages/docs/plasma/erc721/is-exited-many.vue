<template><Layout title='isExitedMany ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, isExitedMany, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/is-exited-many.md'><h1 id="isexitedmany">isExitedMany</h1>
<p><code>isExitedMany</code> method check if a withdraw has been exited. It returns boolean value.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;);

const result = await erc721Token.isExitedMany(&lt;exit tx hash&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        