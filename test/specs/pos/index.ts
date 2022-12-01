import { use } from "@maticnetwork/maticjs";
import { Web3ClientPlugin } from "@maticnetwork/maticjs-ethers";

use(Web3ClientPlugin);

console.log('process.env.NODE_ENV', process.env.NODE_ENV);

import './pos_client.spec'
import './erc20.spec'
import './erc721.spec'
import './erc1155.spec'