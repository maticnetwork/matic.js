<template><Layout title='isExited ERC721 plasma' description='Get started with maticjs' keywords='plasma client, erc721, isExited, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/is-exited.md'><h1 id="isexited">isExited</h1>
<p><code>isExited</code> method check if a withdraw has been exited. It returns boolean value.</p>
<pre><code>const erc721Token = plasmaClient.erc721(&lt;token address&gt;);

const result = await erc721Token.isExited(&lt;exit tx hash&gt;);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        