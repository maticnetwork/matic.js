---
Title: 'Terminate'
Keywords: 'terminate, api, query, indexeddb, jsstore'
Description: 'learn how to use release the connection'
---

Terminate close the connection and releases everything.

#### JsStore

```
await connection.terminate();
console.log("connection terminated");
```

But what to do - when you want to reInitiate the connection ?

You will have to the create Connection again.

```
connection = new JsStore.Connection(new Worker('worker_url'));
```
