---
Title: 'Select'
Keywords: 'select, api, query, indexeddb, jsstore'
Description: 'select data from a table in indexeddb'
---

The Select api is used to select data from a database.

#### Sql

```
Select * from Table_Name;
```

#### JsStore

```
var results = await connection.select({
    from: "Table_Name"
});
//results will be array of objects.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
