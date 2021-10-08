<template><Layout title='Change Table Schema' description='how to change table schema after database is created' keywords='change, table, schema, database, indexeddb' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/change-table-design.md'><p>In order to change your table schema, you need to add an extra property 'version' with a value greater than current Db Version.</p>
<h4 id="example">Example</h4>
<p>Change the version in your table schema</p>
<pre><code>var table1 = {
    name: "table_name",
     columns: {
        column1: { dataType: 'datatype', primaryKey: true },
        column2 : { dataType: 'datatype'},
        ..... ,
        columnN: { dataType: 'datatype' }
    },
    version: 2 //Default version is 1.
}
</code></pre>
<h2 id="howtogetcurrentdbversion">How to get current db version</h2>
<p><br>
You can get Db version by using below code.</p>
<pre><code>connection.getDbVersion(db_name).then(function(version) {
    console.log(version)
})
</code></pre>
<p>The above code is for only development purpose. Dont execute this code to increase Db Version. You will have to specify the value manually.</p>
<p>or you can also find your current db version in indexedDb section of development tools.</p>
<h2 id="whatistheneedofdbversion">What is the need of db version</h2>
<p><br>
IndexedDb is a database technology for browser which means if you do some changes in your web application , any one who use your web app should get latest changes including database changes.</p>
<p>Browser decides to change db schema when indexedb is initiated with db version greater than current db version.</p>
<h2 id="whathappenstodatawhenschemaischanged">What happens to data when schema is changed</h2>
<p><br>
All table is recreated when there is database schema change but JsStore deletes only those tables which version is changed.</p>
<div class="highlight">
So table which does not have schema changes will have no effect but table which have schema changes - means table will be recreated and all data inside it will be lost.
</div>
<p><br></p>
<h3 id="howdoipreservemydatafortablewhichhasschemachanges">How do i preserve my data for table which has schema changes</h3>
<p><br>
Before calling <code>initDb</code> api with new db schema changes, select all data from a table and then insert it after the connection is initiated.</p>
<p>e.g -</p>
<pre><code>async function changeDbSchema() {
    var allData = await connection.select({
        from:`{tableName}`
    });

    var isDbCreated = await connection.initDb(newDbSchema);
    if(isDbCreated){
        await connection.insert({
            into:`{tableName}`
        })
    }
}

// should be called after connection is initiated with old schema
changeDbSchema();
</code></pre>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        