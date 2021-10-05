---
Title: 'Insert'
Keywords: 'insert, api, upsert, indexeddb, jsstore'
Description: 'insert data in indexedb'
---

The Insert api is used to insert new records in a table.

#### Sql

```
INSERT INTO TABLE_NAME
(column1, column2, column3,...columnN)
VALUES
(value1, value2, value3,...valueN);
```

#### JsStore

```
var value = {
    column1: value1,
    column2: value2,
    column3: value3,
    ...
    columnN: valueN
};

var noOfRowsInserted = await connection.insert({
    into: "TABLE_NAME",
    values: [Value], //you can insert multiple values at a time
});
if (noOfRowsInserted > 0) {
    alert('Successfully Added');
}
```

<br>**Note :-** You can also insert data for a column, which you have not defined in db schema. JsStore preserves the NoSql functionality of IndexedDb.

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=insert(%7B%0A%20%20%20%20into%3A%20%22Customers%22%2C%0A%20%20%20%20values%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20customerName%3A%20'ujjwal%20gupta'%2C%0A%20%20%20%20%20%20%20%20contactName%3A%20'ujjwal'%2C%0A%20%20%20%20%20%20%20%20address%3A%20'bhubaneswar%20odisha'%2C%0A%20%20%20%20%20%20%20%20city%3A%20'bhubaneswar'%2C%0A%20%20%20%20%20%20%20%20postalCode%3A%20'12345'%2C%0A%20%20%20%20%20%20%20%20country%3A%20'India'%0A%20%20%20%20%7D%5D%0A%7D)%3B%0A">Example</a>
</p>

#### Upsert

Upsert is used to replace the existing data otherwise insert as new record if does not exist. `upsert` is an option in jsstore insert query which is by default false.

e.g - Consider we have below record in a table "Customers"

```
{
    id:90, //primary key
    name:"ujjwal gupta",
    address:"Bengaluru India"
}
```

now we want to replace the whole data , so we will call `insert` api with option `upsert`.

```
var newData = {
    id:90, //primary key
    name:"some other name",
    address:"some other address"
}

var noOfRowsInserted = await connection.insert({
    into: "Customers",
    upsert:true,
    values: [newData], //you can insert multiple values at a time
});
```

Points to note :-

- While using upsert - primary key should be same as old records otherwise new record will be created. IndexedDb uses primary key to identify existing record.

- In a case where you want to update particular column, you should use <a href="/tutorial/update">update</a> api. `upsert` replace the old record completely except primary key and add a new record.

<div class="margin-top-30px top-border margin-bottom-20px"></div>
**insert** api has following options -

- into : string // table name

- values: Array // values to insert

- return?: Boolean // Return the inserted record. Default value is false.This is useful in case - you want the autoincrement column value.

- skipDataCheck?: Boolean // Whether to check or not supplied data. Default value is false. If supplied true, this will directly insert data without checking any thing like datatype, auto increment etc. This is useful in case - where you want to insert huge record at a time.

- upsert?: boolean; // Update data if exist otherwise insert

<p class="margin-top-40px center-align">
    <a class="btn info" target="_blank" href="https://ujjwalguptaofficial.github.io/idbstudio/?db=Demo&query=insert(%7B%0A%20%20%20%20into%3A%20%22Customers%22%2C%0A%20%20%20%20values%3A%20%5B%7B%0A%20%20%20%20%20%20%20%20customerName%3A%20'ujjwal%20gupta'%2C%0A%20%20%20%20%20%20%20%20contactName%3A%20'ujjwal'%2C%0A%20%20%20%20%20%20%20%20address%3A%20'bhubaneswar%20odisha'%2C%0A%20%20%20%20%20%20%20%20city%3A%20'bhubaneswar'%2C%0A%20%20%20%20%20%20%20%20postalCode%3A%20'12345'%2C%0A%20%20%20%20%20%20%20%20country%3A%20'India'%0A%20%20%20%20%7D%5D%0A%7D)%3B%0A">Example</a>
</p>
