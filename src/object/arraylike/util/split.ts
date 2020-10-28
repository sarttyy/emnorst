
// import { isArrayLike } from "../../is/array-like";
import { slice } from "../../standard/prototype";

/**
 * @param items
 * @param count 幾つの塊に分けるか
 * @param right
 * @return
 */
export const split = <T>(items: ArrayLike<T>, count: number, right=false): ArrayLike<T>[] => {
    // if(!isArrayLike(items)) return null;

    const splitCount = Math.abs(count | 0) || 1;
    const { length } = items;
    const extra = length % splitCount, extraRight = splitCount - extra;
    const chunkSize = (length - extra) / splitCount;
    const chunks = [];

    for(let i = 0, pos = 0;i < splitCount;i++) {
        const pad = +(right ? extraRight <= i : extra > i);
        chunks[i] = slice.call(items, pos, pos += chunkSize+pad);
    }
    return chunks;
};
