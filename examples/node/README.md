# Basic Nodejs example

## How to use

### Clone the repo

```bash
git clone git@github.com:maticnetwork/matic.js.git
```

### Edit config.js

```
PRIVATE_KEY: '<paste your private key here>', // A sample private key prefix with `0x`
FROM_ADDRESS: '<paste address belonging to private key here>',// Your address
```

Update following lines with your wallet address and key.
Be careful with your private key, Use a key your are comfortable with for development purpose.

### Install and run:

```bash
cd examples/node
npm install
node balance-of-ERC20.js
```
