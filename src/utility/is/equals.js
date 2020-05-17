
// @ts-check

import { typeOf } from "../typeof.js";

// SameValueZeroアルゴリズムを使用して、値がすべて等しいことを検証します。
/**
 * Validate that the values are all equal using the SameValueZero algorithm.
 * @param {...any} values
 * @return {boolean}
 */
export const equals = (...values)=>{
    const first = values.shift();
    const equal = Number.isNaN(first)
        ? Number.isNaN
        : (next) => (first === next);
    return values.every(equal);
};

/**
 * 引数の型({@link typeOf})が全て同じかどうかを検証します。
 * @param  {...any} values
 * @return {Boolean}
 */
export const equalsType = (...values)=>(
    equals(...values.map(typeOf))
);

// IDEA: deepEqualをここにつれてくる
