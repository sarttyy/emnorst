
import { isPrime, isInfinity } from "../utility/is/number";
import { generator } from "../utility/generator";

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
export const fibonacci$ = (frequency)=>{
    const x = Math.pow((1 + sqrt5) / 2, frequency);
    const y = Math.pow((1 - sqrt5) / 2, frequency);
    return Math.round((x - y) / sqrt5);
};

/**
 * フィボナッチ数列のジェネレーター。
 *
 * @param {Number} frequency Maximum number of times fibonacci number is generated
 * @param {Number} prev
 * @param {Number} fib
 */
export const fibonacci = (frequency=Infinity, prev=1, fib=0)=>{
    // eslint-disable-next-line no-undef
    prev = BigInt(prev);fib = BigInt(0);
    return generator((_)=>{
        if(frequency--)
            _.yield(fib = prev + (prev = fib));
        else _.return();
    });
};
// function* (frequency=Infinity, seed=1){
//     // eslint-disable-next-line no-undef
//     for(let prev = BigInt(seed), fib = BigInt(0);frequency--;)
//         yield fib = prev + (prev = fib);
// };

/**
 * 素数のジェネレーター。
 *
 * @param {Number} frequency Maximum number of times prime number is generated
 */
export const prime = (frequency=Infinity)=>{
    let i = 3;
    return generator((_)=>{
        if(!frequency--){
            _.return();
            return;
        }
        if(_.phase === 0){
            _.yield(2);
            return;
        }
        if(isPrime(i)){
            _.yield(i);
        }
        i += 2;
    });
};
// function* (frequency=Infinity){
//     yield 2;
//     for(let i = 3;frequency--;i += 2)
//         if(isPrime(i))yield i;
//         else frequency++;
// };

/**
 * 素因数分解。
 *
 * @param {Number} number Numbers to factor
 * @return Array of prime factor of `number`
 * @example
 * primeFactorization(200560490130);
 * // > [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31]
 */
export const primeFactorization = (number)=>{
    if(Number.isNaN(number) || isInfinity(number) || typeof number !== "number")
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

export const triangular = (frequency=Infinity)=>{
    let i = 1, j = 0;
    return generator((_)=>{
        if(!frequency--){
            _.return();
            return;
        }
        _.yield(j += i++);
    });
};
