<template><Layout title='Data Type' description='data type in jsstore' keywords='data type, column, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/data-type.md'><p>JsStore provides following data type -</p>
<ul>
<li><p>String - 'string'</p></li>
<li><p>Number - 'number'</p></li>
<li><p>DateTime - 'date_time' . The value should be date object i.e <code>value = new Date()</code></p></li>
<li><p>Object - 'object'</p></li>
<li><p>Array - 'array'</p></li>
<li><p>Boolean - 'boolean'</p></li>
</ul>
<p>All data types are also present in jsstore member - <code>DATA_TYPE</code> , so you can also use it.</p>
<p>Let's see how to use datatype -</p>
<pre><code>var columns = {
    Id:{ primaryKey: true, autoIncrement: true },
    ItemName:  { notNull: true, dataType: "string" },
    Price:  { notNull: true, dataType: "number" },
    Quantity : { notNull: true, dataType: JsStore.DATA_TYPE.Number }
}
</code></pre>
<p><strong>Note:-</strong> do not use data type boolean, if you want to filter on that column. For more info,check out - <a href="https://stackoverflow.com/questions/48149851/failed-to-execute-only-on-idbkeyrange-the-parameter-is-not-a-valid-key/48179792#48179792">https://stackoverflow.com/questions/48149851/failed-to-execute-only-on-idbkeyrange-the-parameter-is-not-a-valid-key/48179792#48179792</a></p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        