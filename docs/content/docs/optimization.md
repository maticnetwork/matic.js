---
Title: 'Optimization'
Keywords: 'performance, optimization, speed, indexeddb, jsstore'
Description: 'How to increase performance and optimize jsstore query.'
---

# Performance Optimization

<br>
With high amount of data in your tables - query execute time is slow and which means your app becomes slow.

There are couple of tricks that can be used to increase speed : -

- If insert query is slow - use **skipDataCheck** to speed up the insert query.

- If select query is slow - try to find different version of your query & compare the time. Use IdbStudio for these purposes.

- If select query is still slow - use **[keypath](/tutorial/keypath)** to add multiple indexes. Check out [this issue](https://github.com/ujjwalguptaofficial/JsStore/issues/80) & find out how Marco Martínez has improved the speed of select query for 150,000 records.

**Note :-** IndexedDb is a client side database, which means a client can be a high configuration pc device or a low configuration mobile device so fill up your database according to your client.
