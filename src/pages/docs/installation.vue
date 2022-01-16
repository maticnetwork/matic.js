<template><Layout title='installation' description='Get started with maticjs' keywords='pos client, erc20, withdrawExit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/installation.md'><h1 id="installation">Installation</h1>
<p>maticjs has two parts -</p>
<ol>
<li>Main library</li>
<li>Ethereum library</li>
</ol>
<h3 id="mainlibrary">Main library</h3>
<p>The Main library has the core logic and provides different APIs. The user interacts mostly with this library.</p>
<pre><code>npm i @maticnetwork/maticjs
</code></pre>
<h3 id="ethereumlibrary">Ethereum library</h3>
<p>Ethereum library allows us to use any favourite ether library. It is injected into maticjs using plugins.</p>
<p>matic.js supports two popular library -</p>
<ol>
<li><a href="https://web3js.readthedocs.io/">Web3.js</a></li>
<li><a href="https://docs.ethers.io/">Ethers</a></li>
</ol>
<h4 id="web3js">Web3.js</h4>
<pre><code>npm install @maticnetwork/maticjs-web3
</code></pre>
<h4 id="ethers">ethers</h4>
<pre><code>npm install @maticnetwork/maticjs-ethers
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        