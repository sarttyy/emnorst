
// import { isArrayLike } from "../../is/array-like";
import { TupleableToArray } from "../../standard/types";
import { slice } from "../../standard/prototype";

/**
 * @param items チャンクを生成するオブジェクト
 * @param size 幾つごとに塊に分けるか
 * @param right 端数分をインデックスの少ない側に寄せるか
 * @return
 */
export const chunk = <T extends ArrayLike<unknown>>(
    items: T,
    size: number,
    right = false,
): TupleableToArray<T>[] => {
    // if(!isArrayLike(items)) return null;

    const chunkSize = Math.abs(size | 0) || 1;
    const { length } = items;
    const chunks: TupleableToArray<T>[] = [];
    let i = 0, pos = right ? length % chunkSize : 0;

    if(pos > 0) chunks[i++] = slice.call(items, 0, pos) as TupleableToArray<T>;
    while(pos < length)
        chunks[i++] = slice.call(items, pos, pos += chunkSize) as TupleableToArray<T>;
    return chunks;
};
