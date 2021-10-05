---
Title: 'Count'
Keywords: 'count, api, query, indexeddb, jsstore'
Description: 'count api is used to count no of record in a table.'
---

JsStore provides `count` api to count no of records in a table. You can use Where to filter results similar to select.

#### Sql

```
Select count(*) From Table_Name;
Where
    Column1=some_value
and
    Column2=some_another_value;
```

#### JsStore

```
const results = await connection.count({
    from: "Table_Name",
    where: {
        Column1: some_value,
        Column2: some_another_value
    }
});
// results will be a number
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=count(%7B%0A%20%20%20%20from%3A%20%22Customers%22%0A%7D)%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
