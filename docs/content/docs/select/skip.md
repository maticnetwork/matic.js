---
Title: 'Skip'
Keywords: 'skip, offset, select, query, indexeddb'
Description: 'skip records in select query'
---

Skip is used to specify the number of records to skip. It is available with only select.

#### JsStore

```
var results = await connection.select({
    from: "Table_Name",
    skip: number,
});
//results will be array of objects.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20skip%3A%2010%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
