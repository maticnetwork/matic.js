<template><Layout title='POS ERC20' description='Get started with maticjs' keywords='pos client, erc20, contract, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/pos/erc20/index.md'><h1 id="erc20">ERC20</h1>
<p><code>POSClient</code> provides <code>erc20</code> method which helps you to interact with an erc20 token.</p>
<p>The method returns an object which has other various methods.</p>
<pre><code>const erc20token = posClient.erc20(&lt;token address&gt;,&lt;isRoot&gt;);
</code></pre>
<h2 id="childtoken">Child token</h2>
<p>Token on polygon can be initiated by using this syntax -</p>
<pre><code>const childERC20Token = posClient.erc20(&lt;child token address&gt;);
</code></pre>
<h2 id="parenttoken">Parent token</h2>
<p>Token on ethereum can be initiated by providing the second parameter value as <code>true</code>.</p>
<pre><code>const parentERC20Token = posClient.erc20(&lt;parent token address&gt;, true);
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        