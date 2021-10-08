<template><Layout title='Migrating from v2 to v3' description='migrating from v2 to v3' keywords='migrate, v2, v3, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/v2-to-v3.md'><p>Migrating from V2 to V3 is very easy - You just need to change the db schema as per v3.</p>
<p>e.g - schema of v2 looks like this</p>
<pre><code>function getDbSchema() {
  var tblProduct = {
    name: 'Product',
    columns: [
        {
            name: 'Id',
            primaryKey: true,
            autoIncrement: true
        },
        {
            name: 'ItemName',
            notNull: true,
            dataType: JsStore.DATA_TYPE.String
        },
        {
            name: 'Price',
            notNull: true,
            dataType: JsStore.DATA_TYPE.Number
        },
        {
            name: 'Quantity',
            notNull: true,
            dataType: JsStore.DATA_TYPE.Number
        }]
    };
    var db = {
      name: dbName,
      tables:[tblProduct]
    };
    return db;
}
</code></pre>
<p>now we need to convert the schema as per v3</p>
<pre><code>function getDbSchema() {
  var tblProduct = {
    name: 'Product',
    columns:  {
        Id:{ primaryKey: true, autoIncrement: true },
        ItemName:  { notNull: true, dataType: "string" },
        Price:  { notNull: true, dataType: "number" },
        Quantity : { notNull: true, dataType: "number" }
    }
    var db = {
      name: dbName,
      tables:[tblProduct]
    };
    return db;
}
</code></pre>
<p>Another step is to change api <code>createDb</code> to <code>initDb</code> because in v3 createDb has been changed to initDb.</p>
<p>For more help, you can take a look at our <a href="https://github.com/ujjwalguptaofficial/JsStore/tree/master/examples">examples</a> which has been updated as per latest version.</p>
<p>That's all you need to do &amp; everything should work as normal. If you have any problem ask in our gitter group.</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        