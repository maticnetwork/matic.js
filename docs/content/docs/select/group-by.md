---
Title: 'Group By'
Keywords: 'group, by, select, indexeddb, jsstore'
Description: 'learn how to use group by in indexeddb using jsstore'
---

The Group By is used to group the result-set by one or more columns. You can also use Aggregate functions with group by similar to what you can use in SQL.

#### Sql (Where)

```
Select * From Table_Name;
Group By
Column_Name
```

#### JsStore

```
connection.select({
    from: "Table_Name",
    groupBy: Column_Name,
    // You can specify multiple columns at a time by giving the columns name in an array.
    // GroupBy:['column1','column2']

}).then(function(results) {
    //results will be array of objects.
    console.log(results);
}).catch(function(error) {
    alert(error.message);
});
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20groupBy%3A%22country%22%0A%7D)%3B%0A">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
