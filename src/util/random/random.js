
// @ts-check

import { assertType } from "../../utility/condition/assert-type.js";
import { xorshift } from "./xorshift.js";

/**
 * Do not use this function for security purposes!!
 * @param {number} min
 * @param {number} max
 * @param {number} [seed]
 */
export const random = (min=0, max=1, seed) => {
    assertType(min, Number.isFinite);
    assertType(max, Number.isFinite);
    if(min > max)[min, max] = [max, min];
    // 0b1111111111111111111111111111111
    // おそらくこれがxorshiftの最大値。
    const constant = 2147483647;
    const decimal = xorshift(0, constant, seed) / constant;
    const integer = xorshift(min, max - 1, seed);
    return (integer + decimal) % (max - min) + min;
};
