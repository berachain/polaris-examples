import BigNumber from 'bignumber.js';

export const BIG_TEN = new BigNumber(10);

// Formats numbers from base unit to normal unit
const formatFromBaseUnit = (amount: any, decimals: any) => new BigNumber(amount).div(BIG_TEN.pow(decimals)).toString();
export default formatFromBaseUnit;
