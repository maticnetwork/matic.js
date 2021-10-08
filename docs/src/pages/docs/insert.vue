<template><Layout title='Insert' description='insert data in indexedb' keywords='insert, api, upsert, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/insert.md'><p>The Insert api is used to insert new records in a table.</p>
<h4 id="sql">Sql</h4>
<pre><code>INSERT INTO TABLE_NAME
(column1, column2, column3,...columnN)
VALUES
(value1, value2, value3,...valueN);
</code></pre>
<h4 id="jsstore">JsStore</h4>
<pre><code>var value = {
    column1: value1,
    column2: value2,
    column3: value3,
    ...
    columnN: valueN
};

var noOfRowsInserted = await connection.insert({
    into: "TABLE_NAME",
    values: [Value], //you can insert multiple values at a time
});
if (noOfRowsInserted &gt; 0) {
    alert('Successfully Added');
}
</code></pre>
<p><br><strong>Note :-</strong> You can also insert data for a column, which you have not defined in db schema. JsStore preserves the NoSql functionality of IndexedDb.</p>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=insert(%7B%0A%20%20%20%20into%3A%20%22Customers%22%2C%0A%20%20%20%20values%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20customerName%3A%20'ujjwal%20gupta'%2C%0A%20%20%20%20%20%20%20%20contactName%3A%20'ujjwal'%2C%0A%20%20%20%20%20%20%20%20address%3A%20'bhubaneswar%20odisha'%2C%0A%20%20%20%20%20%20%20%20city%3A%20'bhubaneswar'%2C%0A%20%20%20%20%20%20%20%20postalCode%3A%20'12345'%2C%0A%20%20%20%20%20%20%20%20country%3A%20'India'%0A%20%20%20%20%7D%5D%0A%7D)%3B%0A">Example</a>
</p>
<h4 id="upsert">Upsert</h4>
<p>Upsert is used to replace the existing data otherwise insert as new record if does not exist. <code>upsert</code> is an option in jsstore insert query which is by default false.</p>
<p>e.g - Consider we have below record in a table "Customers"</p>
<pre><code>{
    id:90, //primary key
    name:"ujjwal gupta",
    address:"Bengaluru India"
}
</code></pre>
<p>now we want to replace the whole data , so we will call <code>insert</code> api with option <code>upsert</code>.</p>
<pre><code>var newData = {
    id:90, //primary key
    name:"some other name",
    address:"some other address"
}

var noOfRowsInserted = await connection.insert({
    into: "Customers",
    upsert:true,
    values: [newData], //you can insert multiple values at a time
});
</code></pre>
<p>Points to note :-</p>
<ul>
<li><p>While using upsert - primary key should be same as old records otherwise new record will be created. IndexedDb uses primary key to identify existing record.</p></li>
<li><p>In a case where you want to update particular column, you should use <a href="/tutorial/update">update</a> api. <code>upsert</code> replace the old record completely except primary key and add a new record.</p></li>
</ul>
<div class="margin-top-30px top-border margin-bottom-20px"></div>
<p><strong>insert</strong> api has following options -</p>
<ul>
<li><p>into : string // table name</p></li>
<li><p>values: Array // values to insert</p></li>
<li><p>return?: Boolean // Return the inserted record. Default value is false.This is useful in case - you want the autoincrement column value.</p></li>
<li><p>skipDataCheck?: Boolean // Whether to check or not supplied data. Default value is false. If supplied true, this will directly insert data without checking any thing like datatype, auto increment etc. This is useful in case - where you want to insert huge record at a time.</p></li>
<li><p>upsert?: boolean; // Update data if exist otherwise insert</p></li>
</ul>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=insert(%7B%0A%20%20%20%20into%3A%20%22Customers%22%2C%0A%20%20%20%20values%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20customerName%3A%20'ujjwal%20gupta'%2C%0A%20%20%20%20%20%20%20%20contactName%3A%20'ujjwal'%2C%0A%20%20%20%20%20%20%20%20address%3A%20'bhubaneswar%20odisha'%2C%0A%20%20%20%20%20%20%20%20city%3A%20'bhubaneswar'%2C%0A%20%20%20%20%20%20%20%20postalCode%3A%20'12345'%2C%0A%20%20%20%20%20%20%20%20country%3A%20'India'%0A%20%20%20%20%7D%5D%0A%7D)%3B%0A">Example</a>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        