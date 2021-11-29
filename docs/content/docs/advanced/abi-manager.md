---
Title: 'ABIManager'
Keywords: 'abi manager, api type, read, write, polygon'
Description: 'matic.js internally use `ABIManager` for handling abi management for you'
---

# ABIManager

`matic.js` internally uses `ABIManager` for handling abi management for you.

Sometimes you are required to change the ABI, particularly when you are developing a contract. You can do so by using `ABIManager`.

**Syntax**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager(<network name>,<version>);
await manager.init();

// set abi

manager.setABI(<contract name>,<bridge type>, <abi value>);

// get abi

manager.getABI(<contract name>,<bridge type>);
```

The network name, contract name, bridge name etc can be taken from our [official static repo](https://github.com/maticnetwork/static/tree/master/network).

**Example**

```
import { ABIManager } from '@maticnetwork/maticjs'


const manager = new ABIManager('testnet','mumbai');
await manager.init();

// set abi

manager.setABI('ERC20PredicateProxy','pos', 'abi value');

// get abi

manager.getABI('ERC20PredicateProxy','pos');
```
