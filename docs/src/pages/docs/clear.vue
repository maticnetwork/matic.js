<template><Layout title='Clear' description='clear api removes all records from a table.' keywords='clear, table, api, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/clear.md'><p>clear is used to remove all records from a table. You can also use delete api to clear records from particular table but difference is that clear will be fast and wont return no of record deleted while delete will return no of record deleted.</p>
<pre><code>await connection.clear(table_name);
console.log('data cleared successfully');
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=clear(%22Suppliers%22)%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        