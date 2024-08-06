import {
    TransformableToArray,
    PrefixedHexString,
    TransformableToBuffer,
    BN
} from "./types"

export type ToBufferInputTypes =
    | PrefixedHexString
    | number
    | BN
    | Buffer
    | Uint8Array
    | number[]
    | TransformableToArray
    | TransformableToBuffer
    | null
    | undefined

export class BufferUtil {
    static intToHex = function (i: number) {
        if (!Number.isSafeInteger(i) || i < 0) {
            throw new Error(`Received an invalid integer type: ${i}`)
        }
        return `0x${i.toString(16)}`
    }

    static padToEven(value: string): string {
        let a = value

        if (typeof a !== 'string') {
            throw new Error(`[padToEven] value must be type 'string', received ${typeof a}`)
        }

        if (a.length % 2) a = `0${a}`

        return a
    }

    static isHexPrefixed(str: string): boolean {
        if (typeof str !== 'string') {
            throw new Error(`[isHexPrefixed] input must be type 'string', received type ${typeof str}`)
        }

        return str[0] === '0' && str[1] === 'x'
    }

    static stripHexPrefix = (str: string): string => {
        if (typeof str !== 'string')
            throw new Error(`[stripHexPrefix] input must be type 'string', received ${typeof str}`)

        return BufferUtil.isHexPrefixed(str) ? str.slice(2) : str
    }

    /**
     * Converts an `Number` to a `Buffer`
     * @param {Number} i
     * @return {Buffer}
     */
    static intToBuffer = function (i: number) {
        const hex = BufferUtil.intToHex(i)
        return Buffer.from(BufferUtil.padToEven(hex.slice(2)), 'hex')
    }

    static isHexString(value: string, length?: number): boolean {
        if (typeof value !== 'string' || !value.match(/^0x[0-9A-Fa-f]*$/)) return false

        if (length && value.length !== 2 + 2 * length) return false

        return true
    }


    static toBuffer = function (v: ToBufferInputTypes): Buffer {
        if (v === null || v === undefined) {
            return Buffer.allocUnsafe(0)
        }

        if (Buffer.isBuffer(v)) {
            return Buffer.from(v)
        }

        if (Array.isArray(v) || v instanceof Uint8Array) {
            return Buffer.from(v as Uint8Array)
        }

        if (typeof v === 'string') {
            if (!BufferUtil.isHexString(v)) {
                throw new Error(
                    `Cannot convert string to buffer. toBuffer only supports 0x-prefixed hex strings and this string was given: ${v}`
                )
            }
            return Buffer.from(BufferUtil.padToEven(BufferUtil.stripHexPrefix(v)), 'hex')
        }

        if (typeof v === 'number') {
            return BufferUtil.intToBuffer(v)
        }

        if (BN.isBN(v)) {
            if (v.isNeg()) {
                throw new Error(`Cannot convert negative BN to buffer. Given: ${v}`)
            }
            return v.toArrayLike(Buffer)
        }

        if (v.toArray) {
            // converts a BN to a Buffer
            return Buffer.from(v.toArray())
        }

        if (v.toBuffer) {
            return Buffer.from(v.toBuffer())
        }

        throw new Error('invalid type')
    }

    /**
     * Converts a `Buffer` into a `0x`-prefixed hex `String`.
     * @param buf `Buffer` object to convert
     */
    static bufferToHex = function (buf: Buffer): string {
        buf = BufferUtil.toBuffer(buf)
        return '0x' + buf.toString('hex')
    }
}
