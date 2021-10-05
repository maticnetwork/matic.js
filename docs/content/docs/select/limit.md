---
Title: 'Limit'
Keywords: 'limit, select, query, indexeddb, jsstore'
Description: 'Limit no of data in select query'
---

Limit is used to specify the number of records to return. It is available with only select.

#### Sql

```
Select * from Table_Name Limit number;
```

#### JsStore

```
var results = await connection.select({
    from: "Table_Name",
    limit: number
});

//results will be array of objects.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20limit%3A%2010%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
