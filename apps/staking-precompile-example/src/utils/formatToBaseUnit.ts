import { ethers } from 'ethers';

// Format normal units to base units for use on the EVM
const formatToBaseUnit = (amount: string, decimals: any) => {
    if (!amount) return ethers.BigNumber.from(0);
    try {
        return ethers.BigNumber.from(ethers.utils.parseUnits(amount?.toString(), decimals));
    }
    catch (e) {
        return ethers.BigNumber.from(0);
    }
}

export default formatToBaseUnit;
