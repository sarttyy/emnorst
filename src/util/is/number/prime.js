
import { isEven } from "./even.js";
import { isInfinity } from "./infinity.js";
import { isInteger } from "./integer.js";

export const isPrime = (number) => {
    if(number === 2) return true;
    if(number < 2 || isInfinity(number)) return false;
    if(!isInteger(number) || isEven(number)) return false;
    const sqrt = Math.sqrt(number);
    for(let i = 3;i <= sqrt;i += 2)
        if(number % i === 0) return false;
    return true;
};
