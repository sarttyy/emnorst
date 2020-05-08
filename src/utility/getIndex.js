
import { isNull, isNegative } from "./is/index.js";
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
        ? orign.length + index - 1
        : index
);

/**
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} start 切り取り開始位置
 * @param {Number} cutCount 切り取る長さ
 * @param {Array} insertItems 挿入する要素
 */
export const splice = (orign, start, cutCount=0, ...insertItems)=>{
    start = getIndex(orign, start);
    const before = orign.slice(0, start);
    const after = orign.slice(cutCount + start);
    return before.concat(...insertItems, after);
};

/**
 * indexが正の数なら最初から、負の数なら最後から数えて`index`番目の要素を取得します。
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} index
 * @param {*} insert
 */
export const index = (orign, index=0, insert=null)=>{
    if(isNull(insert))
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
 * @returns
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
