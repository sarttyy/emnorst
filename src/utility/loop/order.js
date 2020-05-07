
import { forOf } from "./for";
/**
 * Executes the function specified by func level times.<br>
 * funcで指定された関数をlevel回実行します。
 *
 * @param {Number} level Number of loops
 * @param {Function} func Repeated callback function<br>
 *     The return value of the previous callback function is passed as an argument
 * @param {*} [arg] Arguments passed to the first callback function
 * @return Return value of the last callback function
 */
export const previous = (level, func, arg)=>{
    for(;level--;)arg = func(arg);
    return arg;
};

/**
 * Execute the functions specified in the order from left to right.<br>
 * オーダーで指定された関数を左から順番に実行します。
 *
 * @param {*} arg Arguments passed to the first callback function
 * @param {...Function} orders Repeated callback function.<br>
 *     The return value of the previous callback function is passed as an argument
 * @return Return value of the last callback function
 */
export const inOrder = (arg, ...orders)=>{
    forOf(orders, (func)=>{
        arg = func(arg);
    });
    return arg;
};
