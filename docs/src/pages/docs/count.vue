<template><Layout title='Count' description='count api is used to count no of record in a table.' keywords='count, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/count.md'><p>JsStore provides <code>count</code> api to count no of records in a table. You can use Where to filter results similar to select.</p>
<h4 id="sql">Sql</h4>
<pre><code>Select count(*) From Table_Name;
Where
    Column1=some_value
and
    Column2=some_another_value;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>const results = await connection.count({
    from: "Table_Name",
    where: {
        Column1: some_value,
        Column2: some_another_value
    }
});
// results will be a number
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=count(%7B%0A%20%20%20%20from%3A%20%22Customers%22%0A%7D)%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        