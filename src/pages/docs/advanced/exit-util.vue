<template><Layout title='ExitUtil' description='matic.js internally use ExitUtil for generating proof' keywords='exit util, api type, read, write, polygon' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/advanced/exit-util.md'><h1 id="exitutil">ExitUtil</h1>
<p><code>matic.js</code> internally use <code>ExitUtil</code> for generating proof. It is a class which has different methods for helping with exit utilities.</p>
<h2 id="buildpayloadforexit">buildPayloadForExit</h2>
<p>It exposes <code>buildPayloadForExit</code> method which can be used to generate proof.</p>
<pre><code>import { ExitUtil, RootChain, use, Web3SideChainClient } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-web3";
import HDWalletProvider from "@truffle/hdwallet-provider";
import { from, privateKey, RPC } from "./config";
use(Web3ClientPlugin);


const client = new Web3SideChainClient&lt;any&gt;();
// initiate client
await client.init({
    // log: true,
    network: 'testnet',
    version: 'mumbai',
    parent: {
        provider: new HDWalletProvider(privateKey, RPC.parent),
        defaultConfig: {
            from
        }
    },
    child: {
        provider: new HDWalletProvider(privateKey, RPC.child),
        defaultConfig: {
            from
        }
    }
});

// create root chain instance
const rootChain = new RootChain(client, &lt;root chain address&gt;);

// create exitUtil Instance
const exitUtil = new ExitUtil(client, rootChain);

// generate proof
const proof = await exitUtil.buildPayloadForExit(
    &lt;burn tx hash&gt;,
    &lt;log event signature&gt;,
    &lt;isFast&gt;
)
</code></pre>
<h3 id="generatingproofusingbridgeclient">Generating proof using bridge client</h3>
<p>Every bridge client including <strong>POSClient</strong>, <strong>PlasmaClient</strong> exposes <code>exitUtil</code> property.</p>
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

const proof = await posClient.exitUtil.buildPayloadForExit(
    &lt;burn tx hash&gt;,
    &lt;log event signature&gt;,
    &lt;isFast&gt;
)
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        