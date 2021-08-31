import BN from "bn.js";

export class Converter {
    static toUint256(amount: BN | string | number) {
        const dataType = typeof amount;
        if (dataType === 'number') {
            amount = new BN(amount);
        } else if (dataType === 'string') {
            if ((amount as string).slice(0, 2) === '0x') {
                return amount;
            }
            amount = new BN(amount);
        }
        if (BN.isBN(amount)) {
            return '0x' + amount.toString(16);
        }
        else {
            throw new Error(`Invalid value ${amount}. Can not be converted to uint256`);
        }
    }
}