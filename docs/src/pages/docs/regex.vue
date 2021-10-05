<template><Layout title='Regex' description='using regex to fliter data' keywords='regex, api, query, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/regex.md'><p>Regex is used with Where to search for a specified pattern in a column. For more information about regex, visit <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions">mozilla regular expression guide</a></p>
<h4 id="jsstore">JsStore</h4>
<pre><code>var results = await connection.select({
    from: 'Customers',
    where: {
        Country: {
            regex: /mexico|brazil/i
        }
    }
});
//results will be array of objects.
console.log(results);
</code></pre>
<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Customers'%2C%0A%20%20%20%20where%3A%20%7B%0A%20%20%20%20%20%20%20%20country%3A%20%7B%0A%20%20%20%20%20%20%20%20%20%20%20%20regex%3A%20%2Fmexico%7Cbrazil%2Fi%0A%20%20%20%20%20%20%20%20%7D%0A%20%20%20%20%7D%0A%7D)">Example</a>
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        