import { TYPE_AMOUNT } from ".";

export type POSERC1155TransferParam = {
    tokenId: TYPE_AMOUNT;
    amount: TYPE_AMOUNT;
    from: string;
    to: string;
    data?: string;
};