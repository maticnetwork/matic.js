---
Title: 'Distinct'
Keywords: 'distinct, select, query, indexeddb, jsstore'
Description: 'Distinct is used to return unique set of results.'
---

Distinct is used to return the unique set of result. Distinct filters the result for all columns together except Primary column, since Primary column will make the result always unique.

**Note :-** If you want to return the distinct results based on some columns, then you should use GroupBy.

#### Sql (Where)

```
Select Distinct * From Table_Name;
```

#### JsStore

```
const results = await connection.select({
    from: "Table_Name",
    distinct: true, // optional boolean value - default false
})

 //results will be array of objects.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20distinct%3Atrue%20%2F%2F%20boolean%20value%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
