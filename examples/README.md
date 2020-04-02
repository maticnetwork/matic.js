# Basic Nodejs example

## How to use


### SET ENV Variables
``` 
export PRIVATE_KEY=<paste your private key here> // A sample private key prefix with `0x`
export FROM=<paste address belonging to private key here> // Your address 
```

Be careful with your private key, Use a  key your are comfortable with for development purpose.

### Install and run:

```bash
cd examples
npm run build
node balance-of-ERC20.js
