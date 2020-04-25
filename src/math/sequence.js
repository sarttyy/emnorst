
import {isPrime} from "../utility/is/number";

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
 */
export const fibonacci = function* (frequency=Infinity){
    for(let prev = 1n, fib = 0n;frequency--;)
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
