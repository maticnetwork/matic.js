<template><Layout title='Column' description='column in jsstore is an object where column name is key & column options are values.' keywords='column, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/column.md'><p>Column in jsstore is an object where column name is key &amp; column options are values.</p>
<pre><code>var columns = {
    [column name]: {} 
}
</code></pre>
<p>Let's see an example - </p>
<pre><code>var columns = {
    Id:{ primaryKey: true, autoIncrement: true },
    ItemName:  { notNull: true, dataType: "string" },
    Price:  { notNull: true, dataType: "number" },
    Quantity : { notNull: true, dataType: "number" }
}
</code></pre>
<p>A column has following properties -</p>
<ul>
<li><p>primaryKey: boolean, // declare this column as primary key (optional)</p></li>
<li><p>notNull: boolean, // ensure this column value should not be null (optional)</p></li>
<li><p>dataType: JsStore.DATA_TYPE, // datatype of this column (optional)</p></li>
</ul>
<p>For more info about data type, see this link - <a href="/tutorial/data-type/">DataType</a></p>
<ul>
<li><p>autoIncrement: boolean, // automatically increment value (optional)</p></li>
<li><p>unique: boolean // This column will have unique value (optional)</p></li>
<li><p>default: any, // Provides a default value for a column when none is specified (optional)</p></li>
<li><p><a href="/tutorial/multi-entry">multiEntry</a>: boolean, // Provides support to search inside array values (optional)</p></li>
<li><p>enableSearch: boolean - default value is true // Turn on/off search for this column (optional)</p></li>
<li><p><a href="/tutorial/keypath/">keyPath</a> : string[] - allows you to use multiple indexing // optional </p></li>
</ul></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        