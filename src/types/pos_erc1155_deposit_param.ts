import { TYPE_AMOUNT } from ".";

export type POSERC1155DepositParam = {
    tokenId: TYPE_AMOUNT;
    amount: TYPE_AMOUNT;
    userAddress: string;
    data?: string,
};

export type POSERC1155DepositBatchParam = {
    tokenIds: TYPE_AMOUNT[];
    amounts: TYPE_AMOUNT[];
    userAddress: string;
    data?: string,
};