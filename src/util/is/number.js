
// @ts-check

import { isNumber } from "./type.js";

/**
 * Determines if it is a negative number.
 *
 * 負の数かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
export const isNegative = (number)=>(
    isNumber(number) && number < 0
    || Object.is(-0, number)
);

/**
 * Determines if it is a positive number.
 *
 * 正の数かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
export const isPositive = (number)=>(
    isNumber(number) && number > 0
    || Object.is(0, number)
);

/**
 * Determines if infinity.
 *
 * 無限かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
export const isInfinity = (number)=>(
    number === Infinity || number === -Infinity
);

/**
 * Determines if it is a prime number.
 *
 * 素数かどうかを判定します。
 * @param {*} number
 * @return {Boolean}
 */
export const isPrime = (number)=>{
    if(number === 2)
        return true;
    if(
        isNaN(number)
        || isInfinity(number)
        || !Number.isInteger(number)
        || number < 2
        || number % 2 === 0
    )return false;
    for(let i = 3, sqrt = Math.sqrt(number);i <= sqrt;i += 2)
        if(number % i === 0)return false;
    return true;
};

/**
 * Determine if it is odd (whether the remainder divided by 2 is 1).
 * Even numbers can use {@link isEven}.
 *
 * 奇数かどうか(2で割った余りが1かどうか)を判定します。
 * 偶数には{@link isEven}を使用できます。
 * @param {*} number
 * @return {Boolean}
 */
export const isOdd = (number)=>(
    isNumber(number) && number % 2 === 1
);

/**
 * Determine if it is even (whether the remainder divided by 2 is 0).
 * Odd numbers can use {@link isOdd}.
 *
 * 偶数かどうか(2で割った余りが0かどうか)を判定します。
 * 奇数には{@link isOdd}を使用できます。
 * @param {*} number
 * @return {Boolean}
 */
export const isEven = (number)=>(
    isNumber(number) && number % 2 === 0
);
