import { use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";

use(Web3ClientPlugin);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

import './map_promise.spec'

// HERMEZ
import './hermez/erc20.spec'

// PoS
// import './pos/pos_client.spec'
// import './pos/erc20.spec'
// import './pos/erc721.spec'
// import './pos/erc1155.spec'
