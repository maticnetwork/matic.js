<template><Layout title='PlasmaClient' description='Get started with maticjs' keywords='maticjs, plasma client, contract, polygon, sdk' contentSrc='/home/geralt/Documents/GitHub/matic.js/content/docs/plasma/index.md'><h1 id="plasmabridge">Plasma Bridge</h1>
<p>Plasma bridge functionality is available in <a href="https://github.com/maticnetwork/maticjs-plasma">seperate repository</a>. So in order to use <code>plasma</code> bridge, you need to install seperate package.</p>
<h2 id="installation">Installation</h2>
<pre><code>npm i @maticnetwork/maticjs-plasma
</code></pre>
<h2 id="setup">Setup</h2>
<p><code>PlasmaClient</code> can be used to interact with <strong>Plasma</strong> Bridge.</p>
<pre><code>import { PlasmaClient } from "@maticnetwork/maticjs-plasma"

const plasmaClient = new PlasmaClient();

await plasmaClient.init({
    network: 'testnet',
    version: 'mumbai',
    parent: {
      provider: &lt;parent provider&gt;,
      defaultConfig: {
            from: &lt;from address&gt;
      }
    },
    child: {
      provider: &lt;child provider&gt;,
      defaultConfig: {
            from: &lt;from address&gt;
      }
    }
});
</code></pre>
<p>Once <code>plasmaClient</code> is initiated, you can interact with all available APIS.</p></Layout></template>
        <script>import Layout from '/home/geralt/Documents/GitHub/matic.js/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        