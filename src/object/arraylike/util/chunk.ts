
// import { isArrayLike } from "../../is/array-like";
import { slice } from "../../standard/prototype";

/**
 * @param items チャンクを生成するオブジェクト
 * @param size 幾つごとに塊に分けるか
 * @param right 端数分をインデックスの少ない側に寄せるか
 * @return
 */
export const chunk = <T>(items: ArrayLike<T>, size: number, right=false): ArrayLike<T>[] => {
    // if(!isArrayLike(items)) return null;

    const chunkSize = Math.abs(size | 0) || 1;
    const { length } = items;
    const chunks = [];
    let i = 0, pos = right ? length % chunkSize : 0;

    if(pos > 0) chunks[i++] = slice.call(items, 0, pos);
    while(pos < length)
        chunks[i++] = slice.call(items, pos, pos += chunkSize);
    return chunks;
};
