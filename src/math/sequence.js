
import {isPrime} from "../utility/is/number";

// TODO: xorshift
// const seedRandom = seed=>{
//     let x = seed * seed;
//     x ^= (x << 13);
//     x -= seed;
//     x ^= (x >> 17);
//     x += seed;
//     x ^= (x << 5);
//     return (x * x - seed) / seed;
// };

const sqrt5 = Math.sqrt(5);
/**
 * N番目のフィボナッチ数を取得する。
 * @param {Number} frequency N番目の指定
 */
export const fibonacci$ = frequency=>{
    const x = Math.pow((1 + sqrt5) / 2, frequency);
    const y = Math.pow((1 - sqrt5) / 2, frequency);
    return Math.round((x - y) / sqrt5);
};

/**
 * フィボナッチ数列のジェネレーター。
 *
 * @param {Number} frequency Maximum number of times fibonacci number is generated
 * @param {Number} seed
 */
export const fibonacci = function* (frequency=Infinity, seed=1){
    // eslint-disable-next-line no-undef
    for(let prev = BigInt(seed), fib = 0n;frequency--;)
        yield fib = prev + (prev = fib);
};

/**
 * 素数のジェネレーター。
 *
 * @param {Number} frequency Maximum number of times prime number is generated
 */
export const prime = function* (frequency=Infinity){
    yield 2;
    for(let i = 3;frequency--;i += 2)
        if(isPrime(i))yield i;
        else frequency++;
};

/**
 * 素因数分解。
 *
 * @param {Number} number Numbers to factor
 * @return Array of prime factor of `number`
 * @example
 * primeFactorization(200560490130);
 * // => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
 */
export const primeFactorization = number=>{
    if(Number.isNaN(number) || !Number.isFinite(number) || typeof number !== "number")
        return [];
    const result = [];
    while(number % 2 === 0){
        result.push(2);
        number /= 2;
    }
    for(let i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
        while(number % i === 0){
            result.push(i);
            number /= i;
        }
    if(number > 1)result.push(number);
    return result;
};
