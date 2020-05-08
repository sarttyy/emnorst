
// @ts-check

import { isUndefined } from "../is/index.js";
import { range } from "../range.js";
import { iterate } from "./iterate.js";

// TODO: each

/**
 * Receives an Iterable object and calls a callback function for each value.
 *
 * Iterableなオブジェクトを受け取って値ごとにコールバック関数を呼び出します。
 * ES2015以前の環境でも使用できます。
 * Iterableでないものに対してはループできません。
 * @template T
 * @param {Iterable<T>} iterable An Iterable object used for the loop
 * @param {function(T): any} func
 * A callback function that is executed for each value of the Iterable object.
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 * @example
 * const result = forOf("hello world!", (char)=>{
 *     if(char === "l")return; // continue
 *     if(char === " ")return "hoge"; // break
 *     console.log(char);
 * });
 * // > h
 * // > e
 * // > o
 * // result = "hoge"
 */
export const forOf = function(iterable, func){
    const iterator = iterate(iterable);
    for(;;){
        const iteratorResult = iterator.next();
        if(iteratorResult.done)return void 0;
        const flag = func.call(this, iteratorResult.value);
        if(!isUndefined(flag))return flag;
    }
};

/**
 * OPTIMIZE: 関数のlength0なら素のfor --i:
 * Call the callback function for each number from 0 to maxIndex.
 * 0からmaxIndexまでの数値ごとにコールバック関数を呼び出します。
 * @param {Number} maxIndex Repeats this number of times
 * @param {function(Number): any} func
 * Callback function that is executed maxIndex times
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 */
export const forIndex = function(maxIndex, func){
    return forOf.call(this, range(--maxIndex), func);
};

/**
 * @deprecated
 * @param {*} object
 * @param {*} func
 * @param {*} [that]
 */
export const forIn = (object, func, that)=>{
    if(typeof object === "object")
        object = Object.entries(object);
    return forIndex(object.length, (index)=>(
        func.call(that, object[index])
    ));
};
