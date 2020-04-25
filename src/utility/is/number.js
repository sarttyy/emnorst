
import {isNumber} from "./type";

/**
 * @param {Number} number The value to be compared
 * @return Whether it is a negative number
 */
export const isNegative = number=>(
    isNumber(number) && number < 0
);

/**
 * @param {Number} number The value to be compared
 * @return Whether it is a prime number
 */
export const isPrime = number=>{
    if(number === 2)
        return true;
    if(isNaN(number) || !Number.isFinite(number) || number < 2 || number % 2 === 0)
        return false;
    for(let i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
        if(number % i === 0)return false;
    return true;
};
