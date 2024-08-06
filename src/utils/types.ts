import BN from 'bn.js';

/**
 * [`BN`](https://github.com/indutny/bn.js)
 */
export { BN };

/*
 * A type that represents a `0x`-prefixed hex string.
 */
export type PrefixedHexString = string;

/*
 * A type that represents an object that has a `toArray()` method.
 */
export interface ITransformableToArray {
    toArray(): Uint8Array;
    toBuffer?(): Buffer;
}

/*
* A type that represents an object that has a `toBuffer()` method.
*/
export interface ITransformableToBuffer {
    toBuffer(): Buffer;
    toArray?(): Uint8Array;
}
