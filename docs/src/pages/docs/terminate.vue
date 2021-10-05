<template><Layout title='Terminate' description='learn how to use release the connection' keywords='terminate, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/terminate.md'><p>Terminate close the connection and releases everything.</p>
<h4 id="jsstore">JsStore</h4>
<pre><code>await connection.terminate();
console.log("connection terminated");
</code></pre>
<p>But what to do - when you want to reInitiate the connection ?</p>
<p>You will have to the create Connection again.</p>
<pre><code>connection = new JsStore.Connection(new Worker('worker_url'));
</code></pre></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        