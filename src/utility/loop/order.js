
// @ts-check

import { forOf } from "./for-of.js";
import { isDefined } from "../../util/is/index.js";

/**
 * Executes the function specified by func level times.
 *
 * funcで指定された関数をlevel回実行します。
 *
 * @param {number} level Number of loops
 * @param {function} func Repeated callback function
 * The return value of the previous callback function is passed as an argument
 * @param {*} [arg] Arguments passed to the first callback function
 * @return Return value of the last callback function
 */
export const previous = function(level, func, arg){
    for(;level--;){
        const result = func.call(this, arg);
        isDefined(result) && (arg = result);
    }
    return arg;
};

/**
 * Execute the functions specified in the order from left to right.
 *
 * オーダーで指定された関数を左から順番に実行します。
 *
 * @param {*} arg Arguments passed to the first callback function
 * @param {...function} orders Repeated callback function.
 * The return value of the previous callback function is passed as an argument
 * @return Return value of the last callback function
 */
export const inOrder = function(arg, ...orders){
    forOf(orders, (func)=>{
        arg = func.call(this, arg);
    });
    return arg;
};
