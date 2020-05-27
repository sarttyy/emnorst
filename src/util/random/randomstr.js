
// @ts-check

import { assertType } from "../../utility/condition/assert-type.js";

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
    while(result.length <= length);
    return result.slice(-length);
};
