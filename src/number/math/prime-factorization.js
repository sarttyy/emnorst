
import { isInteger } from "../../util/is/number/integer.js";
import { isInfinity } from "../../util/is/number/infinity.js";

// 素因数分解。

/**
 *
 * @param {number} number Number to be factored.
 * @return {{ [x: number]: number }} Array of prime factor of `number`
 * @example
 * const number = (2**4)*(3**2)*(5**3)*(7**1);
 * primeFactorization(number);
 * // => { 2: 3, 3: 2, 5: 3, 7: 1 }
 */
export const primeFactorization = (number) => {
    if(!isInteger(number) || isInfinity(number))
        return {};
    const result = {};
    const divide = (i) => {
        let count = 0;
        while(number % i === 0) {
            count++;
            number /= i;
        }
        if(count) result[i] = count;
    };
    divide(2);
    const sqrt = Math.sqrt(number);
    for(let i = 3;i <= sqrt;i += 2)
        divide(i);
    if(number > 1) result[number] = 1;
    return result;
};
