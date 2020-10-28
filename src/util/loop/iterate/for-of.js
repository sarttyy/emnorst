
// @ts-check

import { Each } from "../base/each-class.js";

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
 * @param {function(T, PropertyKey): any} func
 * A callback function that is executed for each value of the Iterable object.
 * If breakFunc returns a value that is determined to be falsy,
 * the loop ends and the value is returned.
 * @example
 * const result = forOf("hello world!", (char) => {
 *     if(char === "l") return; // continue
 *     if(char === " ") return "hoge"; // break
 *     console.log(char);
 * });
 * // > h
 * // > e
 * // > o
 * // result = "hoge"
 */
export const forOf = function(iterable, func) {
    const each = new Each(iterable, { mode: "iterable" });
    for(;each.continue();) {
        func.call(this, each.current.value, each.current.index, each.iterator);
        // if(!breakFunc(flag)) return flag;
    }
};
