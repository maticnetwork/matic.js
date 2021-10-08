<template><Layout title='Table' description='learn how to create table in indexedb using jsstore' keywords='table, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/table.md'><p>Table in JsStore is an object which contains name of table &amp; columns schema.</p>
<h3 id="syntax">Syntax :-</h3>
<pre><code>var table1 = {
    name: "table_name",
    columns: {
        column1: { dataType: 'datatype', primaryKey: true },
        column2 : { dataType: 'datatype'},
        ..... ,
        columnN: { dataType: 'datatype' }
    }
}
</code></pre>
<h3 id="example">Example :-</h3>
<pre><code>var tblProduct = {
    name: 'Product',
    columns: {
        // Here "Id" is name of column
        Id:{ primaryKey: true, autoIncrement: true },
        ItemName:  { notNull: true, dataType: "string" },
        Price:  { notNull: true, dataType: "number" },
        Quantity : { notNull: true, dataType: "number" }
    }
};
</code></pre>
<p><strong>Note :-</strong> It is mandatory to have a column with a primary key for every table. A primary key is used to uniquely identify a record or data row.</p>
<p>For more information about column - please check <a href="/tutorial/column">column</a> doc.</p>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        