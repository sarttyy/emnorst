
// @ts-check

import { typeOf } from "../typeof";

/**
 * 引数が全て同じかどうかをSameValueZeroによって検証します。
 * @param  {...any} values
 * @return {Boolean}
 */
export const equals = (...values)=>{
    const first = values.shift();
    const equal = Number.isNaN(first)
        ? Number.isNaN
        : (value) => (first === value);
    return values.every(equal);
};

/**
 * 引数の型({@link typeOf})が全て同じかどうかを検証します。
 * @param  {...any} values
 * @return {Boolean}
 */
export const equalsType = (...values)=>(
    equals(values.map(typeOf))
);

// IDEA: deepEqualをここにつれてくる
