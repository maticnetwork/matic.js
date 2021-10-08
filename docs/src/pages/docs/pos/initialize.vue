<template><Layout title='undefined' description='undefined' keywords='undefined' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/pos/initialize.md'><h1 id="initializeposclient">Initialize POS client</h1>
<h4 id="nodesyntax">Node Syntax</h4>
<pre><code class="js language-js">const Matic = require('maticjs')

const maticPoSClient = new Matic(options).MaticPOSClient
</code></pre>
<h4 id="es6syntax">Es6 Syntax</h4>
<pre><code class="js language-js">import Matic from 'maticjs'

const maticPoSClient = new Matic(options).MaticPOSClient
</code></pre>
<h2 id="options">Options</h2>
<p>Options can be provided in constructor in order to customize the client.</p>
<pre><code>import Matic from 'maticjs';

const options = {
    network: "testnet",
    version: "mumbai",
    maticProvider: window.web3,
    parentProvider: ethereumprovider,
    parentDefaultOptions: { from: account },
    maticDefaultOptions: { from: account },
}
const maticPoSClient = new Matic(options).MaticPOSClient
</code></pre>
<p>Available options are :</p>
<ul>
<li><code>network</code> can be <code>string</code></li>
<li><code>version</code> can be <code>string</code></li>
<li><code>maticProvider</code> can be <code>string</code> or <code>Web3.providers</code> instance. This provider must connect to Matic chain. Value can be anyone of following:</li>
<li><code>network.Matic.RPC</code></li>
<li><code>new Web3.providers.HttpProvider(network.Matic.RPC)</code></li>
<li><a href="https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js">WalletConnect Provider instance</a></li>
<li><code>parentProvider</code> can be <code>string</code> or <code>Web3.providers</code> instance. This provider must connect to Ethereum chain (testnet or mainchain). Value can be anyone of following:</li>
<li><code>network.Main.RPC</code></li>
<li><code>new Web3.providers.HttpProvider(network.Main.RPC)</code></li>
<li><a href="https://github.com/WalletConnect/walletconnect-monorepo#for-web3-provider-web3js">WalletConnect Provider instance</a></li>
<li><code>parentDefaultOptions</code> is simple Javascript <code>object</code> with following options</li>
<li><code>from</code> must be valid account address(required)</li>
<li><code>maticDefaultOptions</code> is simple Javascript <code>object</code> with following options</li>
<li><code>from</code> must be valid account address(required)</li>
</ul>
<hr /></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        