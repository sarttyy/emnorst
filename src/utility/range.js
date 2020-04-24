
import {isUndefined} from "./is";

/**
 * startからendまでのincrementごとの数のジェネレーター。
 * 余り使う機会はなさそうだが、少数も指定可能。
 * for-of文で使う場合代替として{@link forIndex}が使用できます。
 *
 * @param {Number} start
 * 初期値。`end`が指定されていなかった場合は0からこの数までの連版となる。
 * つまり、`range(end)`は`range(0, end)`と等価。
 * @param {Number} [end]
 * 出力する数字の上限/下限。
 * @param {Number} [step=1]
 * 一度に増やす/減らす数。
 * start > end の場合でも負の値を指定する必要はない。
 * @example
 * console.log([...range(-4)]);
 * // [0, -1, -2, -3, -4]
 *
 * console.log([...range(1, 10, 2)]);
 * // [1, 3, 5, 7, 9]
 */
export const range = function* (start, end, step=1){
    if(isUndefined(end)){
        yield* range(0, start);
        return;
    }
    step = Math.abs(step);
    if(start > end)step = -step;
    while(Math.abs(end - start) >= Math.abs(step)){
        yield start;
        start += step;
    }
    yield start;
};
