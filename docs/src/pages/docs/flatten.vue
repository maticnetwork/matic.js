<template><Layout title='Flatten' description='flatten flats array data into primitive data' keywords='flatten, select, multientry, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/flatten.md'><h6 id="availableafterv3113">Available after v - 3.11.3</h6>
<p><br>
flatten is a option in select query which will flatten array data into primitive data.</p>
<p>e.g - Consider your data stored is :-</p>
<pre><code>{
    name:"ujjwal gupta",
    hobbies:["travelling", "motorcycling"]
}
</code></pre>
<p>In the above example - hobbies column is array. </p>
<p>After flattening data will become</p>
<pre><code>[
    {
        name:"ujjwal gupta",
        hobbies:"travelling"
    },
    {
        name:"ujjwal gupta",
        hobbies: "motorcycling"
    }
]
</code></pre>
<h2 id="query">Query</h2>
<pre><code>select({
    from:"Members",
    flatten:true
})
</code></pre>
<p>flatten is useful when you are doing join. Check this issue - <a href="https://github.com/ujjwalguptaofficial/JsStore/issues/188">https://github.com/ujjwalguptaofficial/JsStore/issues/188</a></p>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        