
// @ts-check

import { isUndefined } from "./is/index.js";
import { generator } from "./generator.js";

/**
 * startからendまでのincrementごとの数のジェネレーター。
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
 * 0を指定すると1が使用される
 * @return {Generator<Number>}
 * @example
 * console.log([...range(4)]);
 * // [0, 1, 2, 3, 4]
 *
 * console.log([...range(1, -10, 2)]);
 * // [1, -1, -3, -5, -7, -9]
 */
export const range = (start, end, step=1)=>{
    if(isUndefined(end))
        return range(0, start);
    const stepAbs = step = Math.abs(step) || 1;
    if(start > end)step = -stepAbs;
    return generator((_)=>{
        switch(_.phase){
        case 0:
            _.yield(start);
            break;
        case 1:
            if(Math.abs(end - start) < stepAbs)
                _.goto(3);
            break;
        case 2:
            start += step;
            _.goto(0);
            break;
        default:
            _.return();
        }
    });
};
/*
function* (start, end, step=1){
    if(isUndefined(end)){
        yield* range(0, start);
        return;
    }
    const stepAbs = step = Math.abs(step) || 1;
    if(start > end)step = -step;
    while(Math.abs(end - start) >= stepAbs){
        yield start;
        start += step;
    }
    yield start;
};
// */
