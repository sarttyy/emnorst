
// import { isArrayLike } from "../../../util/is/object/array-like.js";

import { slice } from "../../array/prototype";

/**
 * @param items
 * @param count 幾つの塊に分けるか
 * @param right
 * @return
 */
export const split = <T>(items: ArrayLike<T>, count: number, right=false): ArrayLike<T>[] => {
    // if(!isArrayLike(items)) return null;
    const { length } = items;
    const surplus = length % count;
    const extra = count - surplus;
    const size = (length - surplus) / count;
    const splitArray = new Array(count);
    for(let i = 0, pos = 0;i < count;i++) {
        const pad: number = +(right ? extra <= i : surplus > i);
        splitArray[i] = slice.call(items, pos, pos += size+pad);
    }
    return splitArray;
};
