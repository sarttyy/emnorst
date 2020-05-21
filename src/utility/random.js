
// @ts-check

import { assertType } from "./condition/assert-type.js";

/**
 * @param {number} min
 * @param {number} max
 */
export const random = (min, max)=>(
    [min, max].every(Number.isFinite)
        ? Math.random() * (max - min) + min
        : NaN
);

/**
 * 小文字アルファベットと数字の文字列を生成します。
 * @param {number} length 文字列の長さ
 * @param {number} base N進数
 */
export const randomStr = (length=8, base=36)=>{
    assertType(length, Number.isSafeInteger);
    length = Math.abs(length);
    let result = "";
    do result += Math.random().toString(base).slice(-10);
    while(result.length < length);
    return result.slice(-length);
};

/*
指定された確率でtrueを返し、そうでない場合はfalseを返します。
確率の分子です。
確率の分母です。デフォルト値は100です。
*/

/**
 * Returns true with the specified probability, false otherwise.
 * @param {number} number It is a numerator of probability.
 * @param {number} max The denominator of probability. The default value is 100.
 * @return {boolean}
 */
export const probability = (number, max=100)=>(
    Number.isFinite(number)
    && random(0, max) < number
);
