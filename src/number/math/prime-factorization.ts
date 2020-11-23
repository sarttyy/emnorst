
import { isInteger } from "../is/integer";
import { isInfinity } from "../is/infinity";

// 素因数分解。

interface Factors { [n: number]: number }

/**
 *
 * @param number Number to be factored.
 * @return Array of prime factor of `number`
 * @example
 * const number = (2**4)*(3**2)*(5**3)*(7**1);
 * primeFactorization(number);
 * // => { 2: 4, 3: 2, 5: 3, 7: 1 }
 */
export const primeFactorization = (number: number): Factors => {
    if(!isInteger(number) || isInfinity(number))
        return {};
    const result: Factors = {};
    const divide = (i: number) => {
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
