import { HermezClient } from "@maticnetwork/maticjs";
import { user1, rpc, hermez, user2 } from "../../config";

export const privateKey = user1.privateKey;
export const from = user1.address;
export const to = user2.address;
export const toPrivateKey = user2.privateKey;

export const RPC = rpc.hermez;

export const erc20 = {
    parent: hermez.parent.erc20,
    child: hermez.child.erc20
}

export const ether = {
    parent: hermez.parent.ether,
    child: hermez.child.ether
}

export const hermezClient = new HermezClient();

export const hermezClientForTo = new HermezClient();