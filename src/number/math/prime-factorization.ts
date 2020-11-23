
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

    const factors: Factors = {};

    const divide = (n: number) => {
        let count = 0;
        while(number % n === 0) {
            count++;
            number /= n;
        }
        if(count > 0) factors[n] = count;
    };

    divide(2);

    const sqrt = Math.sqrt(number);
    for(let i = 3;i <= sqrt;i += 2)
        divide(i);

    if(number > 1) factors[number] = 1;

    return factors;
};
