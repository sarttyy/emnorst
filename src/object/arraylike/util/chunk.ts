
// import { isArrayLike } from "../../../util/is/object/array-like.js";

import { slice } from "../../array/prototype";

/**
 * @param items チャンクを生成するオブジェクト
 * @param size 幾つごとに塊に分けるか
 * @param right 端数分をインデックスの少ない側に寄せるか
 * @return
 */
export const chunk = <T>(items: ArrayLike<T>, size: number, right=false): ArrayLike<T>[] => {
    // if(!isArrayLike(items)) return null;

    const chunks = [], length = items.length;
    let i = 0, pos = right ? length % size : 0;

    if(pos) chunks[i++] = slice.call(items, 0, pos);
    while(pos < length)
        chunks[i++] = slice.call(items, pos, pos += size);
    return chunks;
};
