
// import { isArrayLike } from "../../../util/is/object/array-like.js";

/**
 * @param {ArrayLike} items
 * @param {number} size 幾つごとに塊に分けるか
 * @param {boolean} right
 * @return {ArrayLike[]}
 */
export const chunk = (items, size, right=false) => {
    // if(!isArrayLike(items)) return null;
    const restSize = items.length % size;
    const count = (items.length - restSize) / size;
    const chunkArray = new Array(count);
    let i = 0, pos = right ? restSize : 0;
    if(pos) chunkArray[i++] = items.slice(0, restSize);
    while(pos < items.length)
        chunkArray[i++] = items.slice(pos, (pos += size));
    return chunkArray;
};
