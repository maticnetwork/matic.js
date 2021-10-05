---
Title: 'Event'
Keywords: 'event, on, off, indexeddb, jsstore'
Description: 'clear api removes all records from a table.'
---

jsstore provides some events which can be subscribed using "on" & unsubscribed uisng "off"

e.g -

```
connection.on("requestQueueEmpty",()=>{
    console.log("request queue is empty);
});
```

## List of events -

1. requestQueueEmpty - fired when request queue is empty
2. requestQueueFilled - fired when request queue is filled. Basically when fired when length of request queue is one i.e for first request

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
