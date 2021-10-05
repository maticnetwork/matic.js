---
Title: 'Where'
Keywords: 'where, filter, query, indexeddb, jsstore'
Description: 'learn how to filter record with where in indexedb using jsstore'
---

Where can be used to filter records same as Sql Where clause.

#### Sql (Where)

```
Select * From Table_Name
Where
Column1=some_value
and
Column2=some_another_value;
```

#### JsStore

```
var results = await connection.select({
    from: "Table_Name",
    where: {
        column1: some_value,
        column2: some_another_value
    }
});
//results will contains no of rows deleted.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20where%3A%7B%0A%20%20%20%20%20%20%20%20country%3A'Mexico'%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
