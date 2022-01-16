<template><Layout title='Get started' description='Get started with maticjs' keywords='maticjs, introduction, contract, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/get-started.md'><h1 id="getstarted">Get Started</h1>
<p>The <code>@matic.js</code> is a javascript library which helps in interacting with the various components of Matic Network.</p>
<p>In this Get Started tutorial - we will learn about how we can setup and interact with the POS bridge.</p>
<h2 id="installation">Installation</h2>
<p><strong>Install the maticjs package via npm:</strong></p>
<pre><code class="bash language-bash">npm install @maticnetwork/maticjs
</code></pre>
<p><strong>Install the web3js plugin</strong></p>
<pre><code class="bash language-bash">npm install @maticnetwork/maticjs-web3
</code></pre>
<h2 id="setup">Setup</h2>
<pre><code class="javascript language-javascript">import { use } from '@maticnetwork/maticjs'
import { Web3ClientPlugin } from '@maticnetwork/maticjs-web3'

// install web3 plugin
use(Web3ClientPlugin)
</code></pre>
<p>In the above code we are initiating maticjs with <code>web3js</code> but you can also similarly initiate with <a href="docs/setup/ethers">ethers</a>.</p>
<h2 id="posclient">POS client</h2>
<p><code>POSClient</code> helps us to interact with POS Bridge.</p>
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
<p>After <code>POSClient</code> is initiated, we need to initiate the required token types like - <code>erc20</code>, <code>erc721</code> etc.</p>
<p>Let's initiate <code>erc20</code> -</p>
<h3 id="erc20">erc20</h3>
<p><strong>create erc20 child token</strong></p>
<pre><code>const erc20ChildToken = posClient.erc20(&lt;token address&gt;);
</code></pre>
<p><strong>create erc20 parent token</strong></p>
<pre><code>const erc20ParentToken = posClient.erc20(&lt;token address&gt;, true);
</code></pre>
<p>Once erc20 is initaited, you can call various methods that are available, like - <code>getBalance</code>, <code>approve</code>, <code>deposit</code> , <code>withdraw</code> etc.</p>
<p>Let's see some of the API examples -</p>
<h4 id="getbalance">get balance</h4>
<pre><code>const balance = await erc20ChildToken.getBalance(&lt;userAddress&gt;)
console.log('balance', balance)
</code></pre>
<h4 id="approve">approve</h4>
<pre><code>// approve amount 10 on parent token
const approveResult = await erc20ParentToken.approve(10);

// get transaction hash
const txHash = await approveResult.getTransactionHash();

// get transaction receipt
const txReceipt = await approveResult.getReceipt();
</code></pre>
<div class="mt-20px mb-20px top-border"></div>
<p>As you can see, with its simple APIs maticjs makes it very easy to interact with maticjs bridge. <strong>Let's get started with creating something awesome</strong></p>
<h3 id="someimportantlinks">Some important links</h3>
<ul>
<li><a href="https://github.com/maticnetwork/matic.js/tree/master/examples">Examples</a></li>
</ul></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        