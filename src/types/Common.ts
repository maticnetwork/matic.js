import { BigNumber } from 'bn.js'

export type address = string;
export type BigNumber = BigNumber;

export declare interface SendOptions {
  from?: string
  value?: string | number
  gas?: string | number
  gasPrice?: string | number
}
