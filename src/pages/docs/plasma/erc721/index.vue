<template><Layout title='plasma ERC721' description='Get started with maticjs' keywords='plasma client, erc721, contract, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/erc721/index.md'><h1 id="erc721">ERC721</h1>
<p><code>plasmaClient</code> provides <code>erc721</code> method which helps you to interact with a erc721 token.</p>
<p>The method returns an object which has various methods.</p>
<pre><code>const erc721token = plasmaClient.erc721(&lt;token address&gt;,&lt;isRoot&gt;);
</code></pre>
<h2 id="childtoken">Child token</h2>
<p>Token on polygon can be initiated by using this syntax -</p>
<pre><code>const childERC20Token = plasmaClient.erc721(&lt;child token address&gt;);
</code></pre>
<h2 id="parenttoken">Parent token</h2>
<p>Token on ethereum can be initiated by providing second parameter value as <code>true</code>.</p>
<pre><code>const parentERC20Token = plasmaClient.erc721(&lt;parent token address&gt;, true);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        