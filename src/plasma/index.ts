import { ERC20 } from "./erc20";
import { Web3SideChainClient } from "@/model";
import { IClientOption } from "../interfaces";

export class PlasmaClient {

    erc20: ERC20;

    private client_: Web3SideChainClient;

    constructor(option: IClientOption) {
        this.client_ = new Web3SideChainClient(option);
        this.erc20 = new ERC20(
            this.client_,
            this.client_.metaNetwork.abi('ChildERC20')
        );
    }

}