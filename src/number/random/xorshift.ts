
import { isNumber } from "../is/number";
import { density } from "./density";

let seedCache = 0xf0f0f0f0;

/*
xorshiftアルゴリズムを使用して整数の疑似乱数を生成します。
出力される数値の上限は`2147483647(2^31-1)`です。
この関数をセキュリティ目的で使用しないでください。
*/

/**
 * Generates an integer pseudo-random number using the xorshift algorithm.
 *
 * The upper limit of the output value is `2147483647(2^31-1)`.
 *
 * Do not use this function for security purposes!!
 * @param {number} min
 * @param {number} max
 * @param {number} [seed]
 */
export const xorshift = (min=0, max=Infinity, seed?: number): number => {
    Number.isFinite(min);
    isNumber(max);
    if(min > max) [min, max] = [max, min];
    if(min === max) return min;
    let number = isNumber(seed) ? seed : seedCache;
    number ^= number << 13;
    number ^= number >> 17;
    number ^= number << 15;
    const _ = density(Math.abs(seedCache = number), max - min, 0x80000000);
    return Math.floor(_ + min + 0.5);
};

type random = () => number;

export const xorShift32 = (seed?: number): random => {
    let number = isNumber(seed) ? seed | 0 : 0xf0f0f0f0;
    return () => {
        number ^= number << 13;
        number ^= number >> 17;
        number ^= number << 5;
        return number;
    };
};

export const xorShift64 = (seed?: number): random => {
    let number = isNumber(seed) ? seed | 0 : 0xf0f0f0f0;
    return () => {
        number ^= number << 13;
        number ^= number >> 7;
        number ^= number << 17;
        return number;
    };
};

/**
 * Generate a random number by specify seed.
 * the algorithm is xorShift128, which produces integers up to 2^31-1.
 *
 * ***WARNING:*** This is not CSPRNG. do not use this function for security purposes.
 *
 * @param seed
 * @example
 * const rand = xorShift128(Date.now());
 *
 * rand();
 */
export const xorShift128 = (seed?: number): random => {
    let x = 123456789,
        y = 362436069,
        z = 521288629,
        w = 88675123;
    return () => {
        const t = x ^ (x << 11);
        x = y;y = z;z = w;
        return (w ^= (w >> 19) ^ t ^ (t >> 8));
    };
};
