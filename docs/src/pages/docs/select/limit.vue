<template><Layout title='Limit' description='Limit no of data in select query' keywords='limit, select, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/select/limit.md'><p>Limit is used to specify the number of records to return. It is available with only select.</p>
<h4 id="sql">Sql</h4>
<pre><code>Select * from Table_Name Limit number;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: "Table_Name",
    limit: number
});

//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20limit%3A%2010%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        