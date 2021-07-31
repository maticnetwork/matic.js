import BN from "bn.js";

export const formatAmount = (amount: BN | string | number) => {
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
};