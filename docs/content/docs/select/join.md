---
Title: 'Join'
Keywords: 'indexeddb, join, left, inner, jsstore'
Description: 'learn how to use join in indexedb using jsstore'
---

JsStore supports two joins - Inner & Left.

#### Sql (inner join between two tables)

```
Select * From Table1;
Inner Join Table2
On Table1.common_field = Table2.common_field
Where
Table1.Column1=some_value
And
Table2.Column1=some_another_value
```

#### JsStore

```
var results = await connection.select({
    from: table1 name,
    where: {
        [column name]: some value
    },
    join: {
        with: table2_name,
        on: "table1.common_field=table2.common_field",
        type:"inner",
        where: {
            [column name]: some value
        }
    }
});
console.log(results);
```

**Note :-** you can also use - WhereIn, Skip, Order By and limit just like where has been used in the above example.

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Orders'%2C%0A%20%20%20%20join%3A%20%7B%0A%20%20%20%20%20%20%20%20with%3A%20'Customers'%2C%0A%20%20%20%20%20%20%20%20on%3A%20%22Orders.customerId%3DCustomers.customerId%22%0A%20%20%20%20%7D%0A%7D)%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p>

<div class="margin-top-30px top-border margin-bottom-20px"></div>

`join` has following properties -

- with : string // name of table to join

- on : string // join condition eg - table1.property = table2.property

- as : object // rename some column name in order to avoid the column match with other tables

e.g - if a column customerId is present in both table, then a column match error will be thrown & in this situation you can use `as` to resolve the error.

```
connection.select({
    from: table1 name,
    join: {
        with: table2_name,
        on: "table1.common_field=table2.common_field",
        as: {
            customerId: table2_customerId
        }
    }
});
```

- where // to filter

- order // for ordering data - but unlike query without join, order here is little different. You need to provide query along with table name in the form of [tablename].[columnName]

- groupBy // for grouping

- aggregate // aggregation of data

<div class="margin-top-30px top-border margin-bottom-20px"></div>

#### Sql (inner join between three tables)

```
Select * From Table1;
Inner Join Table2
On Table1.common_field = Table2.common_field
Inner Join Table3
On Table1.some_column = Table3.some_common_column
```

#### JsStore

```
var results = await connection.select({
    from: table1_name,
    join:[{
        with:table2_name,
        on: "table1.common_field=table2.common_field"
    },{
        with:table3_name,
        on: "table1.common_field=table3.common_field"
    }]
});
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Orders'%2C%0A%20%20%20%20join%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20with%3A%20'Customers'%2C%0A%20%20%20%20%20%20%20%20on%3A%20%22Orders.customerId%3DCustomers.customerId%22%0A%20%20%20%20%7D%2C%7B%0A%20%20%20%20%20%20%20%20with%3A%22Shippers%22%2C%0A%20%20%20%20%20%20%20%20on%3A%22Orders.shipperId%3DShippers.shipperId%22%0A%20%20%20%20%7D%5D%0A%7D)%3B">Example</a>
    <button class="btn info btnNext">Next</button>
</p>
