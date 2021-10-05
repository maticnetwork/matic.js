<template><Layout title='Event' description='clear api removes all records from a table.' keywords='event, on, off, indexeddb, jsstore' contentSrc='/home/warrior/projects/opensource/matic.js/docs/content/docs/event.md'><p>jsstore provides some events which can be subscribed using "on" &amp; unsubscribed uisng "off"</p>
<p>e.g -</p>
<pre><code>connection.on("requestQueueEmpty",()=&gt;{
    console.log("request queue is empty);
});
</code></pre>
<h2 id="listofevents">List of events -</h2>
<ol>
<li>requestQueueEmpty - fired when request queue is empty</li>
<li>requestQueueFilled - fired when request queue is filled. Basically when fired when length of request queue is one i.e for first request</li>
</ol>
<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p></Layout></template>
        <script>import Layout from '/home/warrior/projects/opensource/matic.js/docs/layouts/docs.vue'
        export default {
            components:{Layout}
        };
        </script>
        