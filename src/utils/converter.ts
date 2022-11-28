import { BaseBigNumber } from "../abstracts";
import { utils } from "../utils";

export class Converter {
    static toHex(amount: BaseBigNumber | string | number) {
        const dataType = typeof amount;
        if (dataType === 'number') {
            amount = new utils.BN(amount);
        } else if (dataType === 'string') {
            if ((amount as string).slice(0, 2) === '0x') {
                return amount;
            }
            amount = new utils.BN(amount);
        }
        if (utils.BN.isBN(amount)) {
            return '0x' + amount.toString(16);
        }
        else {
            throw new Error(`Invalid value ${amount}, value is not a number.`);
        }
    }

    static toBytes(amount: BaseBigNumber | string | number) {
        const hexString = this.toHex(amount) as string;
        hexString.slice(2).padStart(32, "0");
        return '0x' + hexString;
    }

    static hexToNumber(hexString: string) {
        return (new utils.BN(hexString.slice(2))).toNumber();
    }
}