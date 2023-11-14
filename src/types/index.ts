import { BaseBigNumber } from "../abstracts";

export * from "./pos_erc1155_deposit_param";
export * from "./pos_erc1155_transfer_param";

export type TYPE_AMOUNT = BaseBigNumber | string | number;

export type AbiInput = {
  name: string;
  type: string;
  indexed?: boolean;
};

export type AbiOutput = {
  name: string;
  type: string;
};

export type AbiItem = {
  name?: string;
  type: string;
  inputs?: AbiInput[];
  outputs?: AbiOutput[];
  constant?: boolean;
  payable?: boolean;
  stateMutability?: string;
  gas?: number;
  target?: string;
  signature?: string;
  anonymous?: boolean;
};
