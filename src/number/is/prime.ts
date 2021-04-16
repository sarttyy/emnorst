
import type { Meta } from "util/standard/types";
import { isEven } from "./even-odd";
import { isInfinity } from "./infinity";
import { isInteger } from "./integer";

export const isPrime = (number: number): number is Meta<number, {int:true;prime:true}> => {
    if(number === 2) return true;

    if(number < 2
    || isEven(number)
    || isInfinity(number)
    || !isInteger(number)
    ) return false;

    const sqrt = Math.sqrt(number);
    for(let i = 3;i <= sqrt;i += 2)
        if(number % i === 0) return false;
    return true;
};
