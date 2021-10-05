---
Title: 'Order By'
Keywords: 'order by, sort by, select, indexeddb, jsstore'
Description: 'learn how to use order data in indexeddb'
---

Order By is used to sort the data in ascending or descending order, based on any column.

#### Sql

```
Select * from Table_Name Order by column_name sort_type;

```

#### JsStore

```
var results = await connection.select({
    from: "Table_Name",
    order: {
        by: column_name,
        type: sort_type //supprted sort type is - asc,desc
    }
});
//results will be array of objects.
console.log(results);
```

Option order has following properties -

- by: string; // sorting column name

- type: string; // sorting type - asc/desc, default is asc

- idbSorting: boolean // whether to do sorting by indexeddb or by jsstore, default - true

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'country'%2C%0A%20%20%20%20%20%20%20%20type%3A%20%22desc%22%0A%20%20%20%20%7D%0A%7D)%3B%0A">Example</a>
</p>

## Order by multiple column

<br>For ordering by multiple column - you need to provide all order object value in an array

```
var results = await connection.select({
    from: "Table_Name",
    order: [{
        by: column_name1,
        type: sort_type //supprted sort type is - asc,desc
    },
    {
        by: column_name2,
        type: sort_type //supprted sort type is - asc,desc
    }]
});
//results will be array of objects.
console.log(results);
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20%22Customers%22%2C%0A%20%20%20%20order%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20by%3A%20'country'%2C%0A%20%20%20%20%7D%2C%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'city'%0A%20%20%20%20%7D%5D%0A%7D)%3B">Example</a>
</p>

## Order by when using join

<br>
Unlike query without join, order here is little different. You need to provide query along with table name in the form of [tablename].[columnName]

e.g -

```
select({
    from: "Student",
    join: {
        with: "StudentDetail",
        on: "Student.Name=StudentDetail.Name"
    },
    order: { by: 'Student.Order', type: 'asc' }
})
```

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=select(%7B%0A%20%20%20%20from%3A%20'Orders'%2C%0A%20%20%20%20join%3A%20%7B%0A%20%20%20%20%20%20%20%20with%3A%20'OrderDetails'%2C%0A%20%20%20%20%20%20%20%20on%3A%20'Orders.orderId%3DOrderDetails.orderId'%0A%20%20%20%20%7D%2C%0A%20%20%20%20order%3A%20%7B%0A%20%20%20%20%20%20%20%20by%3A%20'OrderDetails.orderId'%0A%20%20%20%20%7D%0A%7D)">Example</a>
     <button class="btn info btnNext">Next</button>
</p>
