
import { isInteger } from "../../util/is/number/integer.js";

/**
 * 階上。
 * @param {number} num
 * @return {number}
 */
export const factorial = (num) => {
    if(!isInteger(num)) return num;
    for(let i = num;i > 2;num *= --i);
    return num ? num : ++num;
};
