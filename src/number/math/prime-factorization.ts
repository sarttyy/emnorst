
import { isInteger } from "../is/integer";
import { isInfinity } from "../is/infinity";

// 素因数分解。

type Factor = [number, number];

/**
 * @param number Number to be factored.
 * @return Array of prime factor of `number`.
 * @example
 * const number = (2**4)*(3**2)*(5**3)*(7**1);
 * primeFactorization(number);
 * // > [[2, 4], [3, 2], [5, 3], [7, 1]]
 */
export const primeFactorization = (number: number): Factor[] => {
    if(!isInteger(number)
    || isInfinity(number)
    || number <= 0
    ) return [];

    const factors: Factor[] = [];

    const divide = (n: number) => {
        let count = 0;
        while(number % n === 0) {
            count++;
            number /= n;
        }
        if(count > 0) factors.push([n, count]);
    };

    divide(2);

    const sqrt = Math.sqrt(number);
    // eslint-disable-next-line no-unmodified-loop-condition
    for(let i = 3;i <= sqrt && number !== 1;i += 2)
        divide(i);

    if(number > 1) factors.push([number, 1]);

    return factors;
};
