<template><Layout title='DataBase' description='Database in JsStore is an object which contains name of database and list of tables.' keywords='database, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/database.md'><p>Database in JsStore is an object which contains name of database and list of tables.</p>
<h3 id="syntax">Syntax :-</h3>
<pre><code>var database = {
    name: "database name",
    tables: [table1, table2, table3]
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

var tblOrder = {
    name: 'Order',
    columns: {
        // Here "OrderId" is name of column
        OrderId:{ primaryKey: true, autoIncrement: true }
    }
};

var db = {
      name: dbName,
      tables: [tblProduct, tblOrder]
}
</code></pre>
<p>Please read <a href="/tutorial/initiate-database">initiate database</a> doc for knowing how to use database schema.</p>
<p class="margin-top-40px center-align">
      <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        