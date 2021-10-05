---
Title: 'Plugin'
Keywords: 'plugin, middleware, indexeddb, jsstore'
Description: 'Plugin can be used to write common set of generic codes'
---

Plugin can be used to write common set of generic codes which can be provided to anyone using a package. Using plugin you can inject apis or insert middleware.

[SqlWeb](/tutorial/sqlweb) is an example of plugin which add `$sql` api.

## How to create a plugin

```
export const AwesomePlugin = {

    // setup is called by jsstore, so all initialization should happen here
    setup: function(connection, params){

        connection.myApi = {
            insertIntoMyTable: function (data){
                connetion.insert({
                    into:"my_table",
                    values:[data]
                })
            }
        }

    }
}
```

In the above code we have created a plugin which add api `myApi` to insert data into specific table.

Now we need to add this plugin to jsstore connection.

```
var connection = new JsStore.Connection();
connection.addPlugin(AwesomePlugin);
```

now plugin is installed and can be used. Let's use the api added by plugin

```
connection.insertIntoMyTable({
    name:'ujjwal gupta'
})
```

<p class="margin-top-40px center-align">
    <button class="btn info btnNext">Next</button>
</p>
