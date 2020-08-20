
/**
 * startからendまでのincrementごとの数のジェネレーター。
 *
 * @param {number} start
 * 初期値。`end`が指定されていなかった場合は0からこの数までの連版となる。
 * つまり、`range(end)`は`range(0, end)`と等価。
 * @param {number} [end]
 * 出力する数字の上限/下限。
 * @param {number} [step]
 * 一度に増やす/減らす数。
 * start > end の場合でも負の値を指定する必要はない。
 * 0を指定すると1が使用される
 * @example
 * console.log([...xrange(4)]);
 * // [0, 1, 2, 3]
 *
 * console.log([...xrange(1, -10, 2)]);
 * // [1, -1, -3, -5, -7, -9]
 */
export const xrange = function* (start, end, step) {
    if(end == null) {
        end = start;
        start = 0;
    }
    start |= 0;
    end |= 0;

    if(start === end) return;

    const stepAbs = step = Math.abs(step) || 1;
    if(start > end) step = -stepAbs;

    while(Math.abs(end - start) > stepAbs) {
        yield start;
        start += step;
    }
    yield start;
};
