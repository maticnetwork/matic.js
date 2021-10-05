<template><Layout title='Or' description='learn how to use or to filter records in indexeddb' keywords='or, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/or.md'><p>Or can be used with Where to filter records.</p>
<h4 id="sql">Sql</h4>
<pre><code>Select * From Table_Name;
Where
Column1=some_value
or
Column2=some_another_value;
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: "Table_Name",
    where: {
        Column1: some_value,
        or: {
            Column2: some_another_value
        }
    }
});
//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20where%3A%7B%0A%20%20%20%20%20%20%20%20country%3A'Mexico'%2C%0A%20%20%20%20%20%20%20%20or%3A%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20city%3A'London'%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        