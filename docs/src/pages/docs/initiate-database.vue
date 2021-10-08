<template><Layout title='Initiate Database' description='how to initiate database in indexeddb using jsstore' keywords='initiate, database, table, column, indexeddb' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/initiate-database.md'><p>For initiating database you need to perform two steps -</p>
<ol>
<li><p>Create database schema</p></li>
<li><p>Call <code>initDb</code> api supplying database schema</p></li>
</ol>
<p><br></p>
<h3 id="example">Example :-</h3>
<pre><code>// initiate jsstore connection
var connection = new JsStore.Connection();

// step1 - create database schema
var tblProduct = {
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

// step 2
var isDbCreated = await connection.initDb(db);
// isDbCreated will be true when database will be initiated for first time
// and false after that.
</code></pre>
<p>If you are not able to understand, please have a look at <a href="https://github.com/ujjwalguptaofficial/JsStore/tree/master/examples">examples</a> provided by jsstore.</p>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        