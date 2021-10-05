---
Title: 'Change Table Schema'
Keywords: 'change, table, schema, database, indexeddb'
Description: 'how to change table schema after database is created'
---

In order to change your table schema, you need to add an extra property 'version' with a value greater than current Db Version.

#### Example

Change the version in your table schema

```
var table1 = {
    name: "table_name",
     columns: {
        column1: { dataType: 'datatype', primaryKey: true },
        column2 : { dataType: 'datatype'},
        ..... ,
        columnN: { dataType: 'datatype' }
    },
    version: 2 //Default version is 1.
}
```

## How to get current db version

<br>
You can get Db version by using below code.

```
connection.getDbVersion(db_name).then(function(version) {
    console.log(version)
})
```

The above code is for only development purpose. Dont execute this code to increase Db Version. You will have to specify the value manually.

or you can also find your current db version in indexedDb section of development tools.

## What is the need of db version

<br>
IndexedDb is a database technology for browser which means if you do some changes in your web application , any one who use your web app should get latest changes including database changes.

Browser decides to change db schema when indexedb is initiated with db version greater than current db version.

## What happens to data when schema is changed

<br>
All table is recreated when there is database schema change but JsStore deletes only those tables which version is changed.

<div class="highlight">
So table which does not have schema changes will have no effect but table which have schema changes - means table will be recreated and all data inside it will be lost.
</div>
<br>
### How do i preserve my data for table which has schema changes
<br>
Before calling `initDb` api with new db schema changes, select all data from a table and then insert it after the connection is initiated.

e.g -

```
async function changeDbSchema() {
    var allData = await connection.select({
        from:`{tableName}`
    });

    var isDbCreated = await connection.initDb(newDbSchema);
    if(isDbCreated){
        await connection.insert({
            into:`{tableName}`
        })
    }
}

// should be called after connection is initiated with old schema
changeDbSchema();

```

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
