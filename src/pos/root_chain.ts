import { BaseToken, Web3SideChainClient } from "../utils";
import { TYPE_AMOUNT } from "../types";
import BN from "bn.js";
import { BIG_ONE, CHECKPOINT_INTERVAL, BIG_TWO, LOGGER } from "../constant";
import { ITransactionOption } from "../interfaces";

export class RootChain extends BaseToken {

    constructor(client_: Web3SideChainClient, address: string) {
        super({
            tokenAddress: address,
            tokenContractName: 'RootChain',
            isParent: true
        }, client_);
    }

    method(methodName: string, ...args) {
        return this.getContract().then(contract => {
            return contract.method(methodName, ...args);
        });
    }

    getLastChildBlock() {
        return this.method("getLastChildBlock").then(method => {
            return method.read<string>();
        });
    }

    async findRootBlockFromChild(childBlockNumber: TYPE_AMOUNT): Promise<BN> {
        childBlockNumber = new BN(childBlockNumber);
        // first checkpoint id = start * 10000
        let start = BIG_ONE;

        // last checkpoint id = end * 10000
        const method = await this.method("currentHeaderBlock");
        const currentHeaderBlock = await method.read<string>();
        let end = new BN(currentHeaderBlock).div(
            CHECKPOINT_INTERVAL
        );

        // binary search on all the checkpoints to find the checkpoint that contains the childBlockNumber
        let ans;
        while (start.lte(end)) {
            if (start.eq(end)) {
                ans = start;
                break;
            }
            const mid = start.add(end).div(BIG_TWO);
            const headerBlocksMethod = await this.method(
                "headerBlocks",
                mid.mul(CHECKPOINT_INTERVAL).toString()
            );
            const headerBlock = await headerBlocksMethod.read<{ start: number, end: number }>();

            const headerStart = new BN(headerBlock.start);
            const headerEnd = new BN(headerBlock.end);

            if (headerStart.lte(childBlockNumber) && childBlockNumber.lte(headerEnd)) {
                // if childBlockNumber is between the upper and lower bounds of the headerBlock, we found our answer
                ans = mid;
                break;
            } else if (headerStart.gt(childBlockNumber)) {
                // childBlockNumber was checkpointed before this header
                end = mid.sub(BIG_ONE);
            } else if (headerEnd.lt(childBlockNumber)) {
                // childBlockNumber was checkpointed after this header
                start = mid.add(BIG_ONE);
            }
        }
        return ans.mul(CHECKPOINT_INTERVAL);
    }

    deposit(userAddress: string, tokenAddress: string, depositData: string, option?: ITransactionOption) {
        return this.method(
            "depositFor",
            userAddress,
            tokenAddress,
            depositData
        ).then(method => {
            return this.processWrite(method, option);
        });
    }

}