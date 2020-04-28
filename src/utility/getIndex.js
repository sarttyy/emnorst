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
 *
 * @param {String|Array} orign 元の要素
 * @param {Number} start 切り取り開始位置
 * @param {Number} cutCount 切り取る長さ
 * @param {Array} insertItems 挿入する要素
 */
export const splice = (orign, start, cutCount, ...insertItems)=>{
    const before = orign.slice(0, start);
    const after = orign.slice(cutCount + start);
    return before.concat(...insertItems, after);
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
// const [key, name="the name", ...rest, param{3}] = ArrayLike();
// [difault, ...]
// const {key, key: name, ...rest} = ObjectLike();
// {key: null || name || [name, difault], ...}
