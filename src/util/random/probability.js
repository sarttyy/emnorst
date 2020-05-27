
// @ts-check

import { random } from "./random.js";

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
