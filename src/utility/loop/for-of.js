
// @ts-check

import { isDefined } from "../is/index.js";
import { iterate } from "./iterate.js";
import { loop } from "./loop.js";

/*
iterable protocolを使用して値ごとにコールバック関数を呼び出します。
これはfor...of文と同じように使用することができます。
ArrayLikeなオブジェクトはSymbolが定義されていない環境でも反復可能です。

breakFuncでfalsyと判断される値を返した場合、ループが終了し、値が返されます。

ループを継続するかどうか判断する関数。デフォルトでisUndefinedが指定されます。
*/

/**
 * Call the callback function for each value using the iterable protocol.
 * It can be used like a for ... of statement.
 * ArrayLike objects can be repeated in environments where Symbol is not defined.
 *
 * @template T
 * @param {Iterable<T>} iterable An Iterable object used for the loop
 * @param {function(T): any} func
 * A callback function that is executed for each value of the Iterable object.
 * If breakFunc returns a value that is determined to be falsy,
 * the loop ends and the value is returned.
 * @param {function(any): Boolean} isBreak
 * A function that determines whether to continue the loop.
 * IsUndefined is specified by default.
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
export const forOf = function(iterable, func, isBreak=isDefined){
    const iterator = iterate(iterable);
    return loop(()=>{
        const iteratorResult = iterator.next();
        if(iteratorResult.done)return void 0;
        return func.call(this, iteratorResult.value);
    }, { isBreak });
    // for(;;){
    //     const iteratorResult = iterator.next();
    //     if(iteratorResult.done)return void 0;
    //     const flag = func.call(this, iteratorResult.value);
    //     if(!breakFunc(flag))return flag;
    // }
};
