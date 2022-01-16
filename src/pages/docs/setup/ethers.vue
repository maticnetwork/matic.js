<template><Layout title='Web3js setup' description='Get started with maticjs' keywords='pos client, erc20, withdrawExit, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/setup/ethers.md'><h1 id="etherjs">Ether.js</h1>
<p>The <a href="https://docs.ethers.io/">ethers.js</a> library aims to be a complete and compact library for interacting with the Ethereum Blockchain and its ecosystem.</p>
<h2 id="setupetherjs">Setup ether.js</h2>
<p>ether.js support is available via seperate package as a plugin for matic.js.</p>
<h3 id="installation">Installation</h3>
<pre><code>npm install @maticnetwork/maticjs-ethers
</code></pre>
<h3 id="setup">setup</h3>
<pre><code>import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'

// install ethers plugin
use(Web3ClientPlugin)
</code></pre>
<p>Let's see one example of creating <code>POSClient</code> using ethers -</p>
<pre><code>import { POSClient,use } from "@maticnetwork/maticjs"
import { Web3ClientPlugin } from '@maticnetwork/maticjs-ethers'
import { providers, Wallet } from "ethers";


// install web3 plugin
use(Web3ClientPlugin);

const parentProvider = new providers.JsonRpcProvider(rpc.parent);
const childProvider = new providers.JsonRpcProvider(rpc.child);

const posClient = new POSClient();
await posClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: new Wallet(privateKey, parentProvider),
      defaultConfig: {
        from : fromAddress
      }
    },
    child: {
      provider: new Wallet(privateKey, childProvider),
      defaultConfig: {
        from : fromAddress
      }
    }
});
</code></pre>
<h2 id="examples">Examples</h2>
<p>The examples for different cases are available on <a href="https://github.com/maticnetwork/maticjs-ethers">ethers plugin repo</a>.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        