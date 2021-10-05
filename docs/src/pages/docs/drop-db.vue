<template><Layout title='Drop Database' description='deleting database from indexeddb' keywords='drop, database, remove, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/drop-db.md'><p>dropDb is used to remove the current database from browser storage.</p>
<pre><code>connection.dropDb().then(function() {
    console.log('Db deleted successfully');
}).catch(function(error) {
    console.log(error);
});;
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=dropDb()%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        