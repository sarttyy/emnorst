
// @ts-check

import { isNullLike, isNegative } from "../util/is/index.js";
import { Symbol } from "../env/symbol.js";

/**
 * 最後から数えて`index`番目の要素を取得します。
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} index
 */
export const last = (orign, index=1)=>(
    orign[orign.length - index]
);

/**
 * 最初から数えて`index`番目の要素を取得します。
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} index
 */
export const first = (orign, index=1)=>(
    orign[index - 1]
);

/**
 * @private
 * @param {ArrayLike} orign
 * @param {Number} index
 */
const getIndex = (orign, index=0)=>(
    isNegative(index)
        ? orign.length + index
        : index
);

/**
 * 元のオブジェクトへの破壊的な変更を行わず、新しい配列を作成します。
 * @param {string | array} origin 元のオブジェクト
 * @param {number} start 切り取り開始位置
 * @param {number} cutCount 切り取る長さ
 * @param {...any} insertItems 挿入する要素
 */
export const splice = (origin, start=0, cutCount=0, ...insertItems)=>{
    if(isNegative(cutCount))
        start -= cutCount = -cutCount;
    const startIndex = isNegative(start)
        ? origin.length + start
        : start;
    const before = origin.slice(0, startIndex);
    const after = origin.slice(startIndex + cutCount);
    // @ts-ignore
    return before.concat(...insertItems, after);
};

/**
 * indexが正の数なら最初から、負の数なら最後から数えて`index`番目の要素を取得します。
 *
 * @param {string | array} orign 元の要素
 * @param {Number} index
 * @param {string | array} [insert]
 */
export const index = (orign, index=0, insert)=>{
    if(isNullLike(insert))
        return orign[getIndex(orign, index)];
    return splice(orign, index, 1, insert);
};

/**
 *
 * @param {Iterable} iterable
 * @param {Number} index
 */
export const iterableIndex = (iterable, index)=>{
    const iterator = iterable[Symbol.iterator]();
    // if(isNegative(index))index += orign.length;
    for(;--index;)iterator.next();
    return iterator.next().value;
};

/**
 * Beta:
 * 分割代入拡張
 *
 * @param {Array} array 元の配列
 * @param {Number} beforeItem restの前のパラメータの数
 * @param {Number} afterItem restの後のパラメータの数
 * @return
 * @example
 * const arr = [1,2,3,4,5,6,7,8];
 * const [a, b, rest, y, z] = restSplit(arr, 2, 2);
 * // a = 1, b = 2
 * // rest = [3,4,5,6]
 * // y = 7, z = 8
 * // const [a, b, ...rest, y, z] = arr;
 */
export const restSplit = (array, beforeItem, afterItem=0)=>{
    const restEndIndex = array.length - afterItem;
    const rest = array.slice(beforeItem, restEndIndex);
    array.splice(beforeItem, restEndIndex - beforeItem, rest);
    return array;
};

// classifying
// const [key, name="the name", ...rest, param{3}] = ArrayLike();
// [difault, ...]
// const {key, key: name, ...rest} = ObjectLike();
// {key: null || name || [name, difault], ...}
