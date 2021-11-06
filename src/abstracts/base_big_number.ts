import { throwNotImplemented } from "..";

export abstract class BaseBigNumber {
    static isBN(value) {
        return throwNotImplemented<boolean>();
    }

    abstract toString(): string;
    abstract toNumber(): number;
    abstract toBuffer(): Buffer;
    abstract add(value: BaseBigNumber): BaseBigNumber;
    abstract sub(value: BaseBigNumber): BaseBigNumber;
    abstract mul(value: BaseBigNumber): BaseBigNumber;
    abstract div(value: BaseBigNumber): BaseBigNumber;

    abstract lte(value: BaseBigNumber): boolean;
    abstract lt(value: BaseBigNumber): boolean;
    abstract gte(value: BaseBigNumber): boolean;
    abstract gt(value: BaseBigNumber): boolean;
    abstract eq(value: BaseBigNumber): boolean;
}