<template><Layout title='Optimization' description='How to increase performance and optimize jsstore query.' keywords='performance, optimization, speed, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/optimization.md'><h1 id="performanceoptimization">Performance Optimization</h1>
<p><br>
With high amount of data in your tables - query execute time is slow and which means your app becomes slow.</p>
<p>There are couple of tricks that can be used to increase speed : -</p>
<ul>
<li><p>If insert query is slow - use <strong>skipDataCheck</strong> to speed up the insert query.</p></li>
<li><p>If select query is slow - try to find different version of your query &amp; compare the time. Use IdbStudio for these purposes.</p></li>
<li><p>If select query is still slow - use <strong><a href="/tutorial/keypath">keypath</a></strong> to add multiple indexes. Check out <a href="https://github.com/ujjwalguptaofficial/JsStore/issues/80">this issue</a> &amp; find out how Marco Martínez has improved the speed of select query for 150,000 records.</p></li>
</ul>
<p><strong>Note :-</strong> IndexedDb is a client side database, which means a client can be a high configuration pc device or a low configuration mobile device so fill up your database according to your client.</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        