<template><Layout title='Web3js setup' description='Get started with maticjs' keywords='pos client, erc20, withdrawExit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/setup/web3js.md'><h1 id="web3js">Web3.js</h1>
<p><a href="https://web3js.readthedocs.io/">web3.js</a> is a collection of libraries that allow you to interact with a local or remote ethereum node using HTTP, IPC or WebSocket.</p>
<h2 id="setupweb3js">Setup web3.js</h2>
<p>web3.js support is available via seperate package as a plugin for matic.js.</p>
<h3 id="installation">Installation</h3>
<pre><code>npm install @maticnetwork/maticjs-web3
</code></pre>
<h3 id="setup">setup</h3>
<pre><code>import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
</code></pre>
<p>Let's see an example of creating <code>POSClient</code> using web3 -</p>
<pre><code>import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'
import HDWalletProvider from "@truffle/hdwallet-provider"

// install web3 plugin
use(Web3ClientPlugin);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new HDWalletProvider(privateKey, mainRPC),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new HDWalletProvider(privateKey, childRPC),
      defaultConfig: {
        from : fromAddress
      }
    }
});
</code></pre>
<h2 id="examples">Examples</h2>
<p>The examples for different cases are available in <a href="https://github.com/maticnetwork/maticjs-web3">web3 plugin repo</a></p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        