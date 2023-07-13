import { ZkEvmClient } from "@maticnetwork/maticjs";
import { user1, rpc, zkEvm, user2 } from "../../config";

export const privateKey = user1.privateKey;
export const from = user1.address;
export const to = user2.address;
export const toPrivateKey = user2.privateKey;

export const RPC = rpc.zkEvm;

export const erc20 = {
    parent: zkEvm.parent.erc20,
    child: zkEvm.child.erc20
}

export const ether = {
    parent: zkEvm.parent.ether,
    child: zkEvm.child.ether
}

export const zkEvmClient = new ZkEvmClient();

export const zkEvmClientForTo = new ZkEvmClient();
