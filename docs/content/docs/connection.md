---
Title: 'Connection'
Keywords: 'database, connection, query, indexeddb, jsstore'
Description: 'How to create connection in jsstore'
---

Connection in jsstore is instance of class `Connection`. All apis are called using connection.

##### Syntax

<br>
### With Web Worker

```
var connection = new JsStore.Connection(new Worker('jsstore worker path'));

```

**example** - <a target="_blank" href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/simple_example">https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/simple_example</a>

### Without web worker

```
var connection = new JsStore.Connection();

```

**example** - <a target="_blank" href="https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/without_web_worker">https://github.com/ujjwalguptaofficial/jsstore-examples/tree/master/without_web_worker</a>

<div class="margin-top-30px top-border margin-bottom-20px"></div>
<br>
## How to create connection in webpack
<br>

1. Install jsstore using npm or yarn - `npm i jsstore`

2. Install file-loader - `npm i file-loader -D`

3. Create a file jsstore_con.js or jsstore_con.ts (for typescript). This file will be used to create the jsstore connection. You can choose any file name.

4. Inside the file jsstore_con.js, write below code -

```
const getWorkerPath = () => {

    // return dev build when env is development
    if (process.env.NODE_ENV === 'development') {

        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.js");

    }
    else { // return prod build when env is production

        return require("file-loader?name=scripts/[name].[hash].js!jsstore/dist/jsstore.worker.min.js");

    }
};

const workerPath = getWorkerPath();
export const connection = new JsStore.Connection(new Worker(workerPath));
```

5. Step 4 creates a connection and export the connection variable. You can import this connection variable to anywhere in your code.

<br>In the above code we are using **file-loader** to load jsstore worker file but you are free to use your own technique to load jsstore worker. The simplest approach is download jsstore.worker.js and then specify its path.

If you are finding difficult to understand, please take a look at [examples](https://github.com/ujjwalguptaofficial/jsstore-examples) or our [medium page](https://medium.com/jsstore)

<br>
**Important points :-**

- The connection variable will be used to execute the further query.
- A connection will handle one db at a time.
- Do not create multiple connection for one db.

<p class="margin-top-40px center-align">
      <button class="btn info btnNext">Next</button>
</p>
