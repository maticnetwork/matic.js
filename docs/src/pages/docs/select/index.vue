<template><Layout title='Select' description='select data from a table in indexeddb' keywords='select, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/select/index.md'><p>The Select api is used to select data from a database.</p>
<h4 id="sql">Sql</h4>
<pre><code>Select * from Table_Name;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: "Table_Name"
});
//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        