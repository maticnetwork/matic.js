import { POSClient } from "@maticnetwork/maticjs";
import { user1, rpc, pos, user2 } from "../../config";

export const privateKey = user1.privateKey;
export const from = user1.address;
export const to = user2.address;
export const toPrivateKey = user2.privateKey;

export const RPC = rpc.pos;

export const erc20 = {
    parent: pos.parent.erc20,
    child: pos.child.erc20
}
export const erc721 = {
    parent: pos.parent.erc721,
    child: pos.child.erc721
}
export const erc1155 = {
    parent: pos.parent.erc1155,
    child: pos.child.erc1155
}

export const posClient = new POSClient();

export const posClientForTo = new POSClient();