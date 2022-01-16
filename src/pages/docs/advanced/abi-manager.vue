<template><Layout title='ABIManager' description='matic.js internally use ABIManager for handling abi management for you' keywords='abi manager, api type, read, write, polygon' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/advanced/abi-manager.md'><h1 id="abimanager">ABIManager</h1>
<p><code>matic.js</code> internally uses <code>ABIManager</code> for handling abi management for you.</p>
<p>Sometimes you are required to change the ABI, particularly when you are developing a contract. You can do so by using <code>ABIManager</code>.</p>
<p><strong>Syntax</strong></p>
<pre><code>import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(&lt;network name&gt;,&lt;version&gt;);
await manager.init();

// set abi

manager.setABI(&lt;contract name&gt;,&lt;bridge type&gt;, &lt;abi value&gt;);

// get abi

manager.getABI(&lt;contract name&gt;,&lt;bridge type&gt;);
</code></pre>
<p>The network name, contract name, bridge name etc can be taken from our <a href="https://github.com/maticnetwork/static/tree/master/network">official static repo</a>.</p>
<p><strong>Example</strong></p>
<pre><code>import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
</code></pre></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        