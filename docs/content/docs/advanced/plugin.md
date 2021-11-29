---
Title: 'Plugin'
Keywords: 'plugin, api type, read, write, polygon'
Description: 'Using plugin you can inject your code into matic.js'
---

# Plugin

Using plugin you can inject your code into `matic.js`. It can be used to write common set of generic codes which can be provided to anyone using a package.

<div class="highlight">
Plugin makes the `matic.js` light weight as it implements only important logical part.
</div>

<br>
Infact web3 library is supported using plugin which allows us to use our favourite library.

### Plugin development

Plugin is a class which implements `IPlugin`.

```
import { IPlugin } from "@maticnetwork/maticjs";

export class MyPlugin implements IPlugin {

    // variable matic is - default export of matic.js
    setup(matic) {

        // get web3client
        const web3Client = matic.Web3Client ;
    }
}
```

As you can see - you just need to implement a `setup` method which will be called with default export of `matic.js`.

### Use Plugin

`matic.js` expose `use` method for using a plugin.

```
import { use } from '@maticnetwork/maticjs'

use(MyPlugin)
```

You can use multiple plugins and they will be called in the same order as they are declared.

**Some plugin repo are -**

- [Matic web3.js](https://github.com/maticnetwork/maticjs-web3)
- [Matic ethers](https://github.com/maticnetwork/maticjs-ethers)
- [FxPortal.js](https://github.com/maticnetwork/fx-portal.js)
