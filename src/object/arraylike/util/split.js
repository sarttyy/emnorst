
// import { isArrayLike } from "../../../util/is/object/array-like.js";

/**
 * @param {ArrayLike} items
 * @param {number} count 幾つの塊に分けるか
 * @param {boolean} right
 * @return {ArrayLike[]}
 */
export const split = (items, count, right=false) => {
    // if(!isArrayLike(items)) return null;
    const { length } = items;
    const surplus = length % count;
    const extra = count - surplus;
    const size = (length - surplus) / count;
    const splitArray = new Array(count);
    for(let i = 0, pos = 0;i < count;i++) {
        const pad = right ? extra <= i : surplus > i;
        splitArray[i] = items.slice(pos, (pos += size + pad));
    }
    return splitArray;
};
