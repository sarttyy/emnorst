
import { Each } from "../base/each-class.js";

export const find = function(items, fn) {
    for(const each = new Each(items);each.continue();) {
        const { current } = each;
        const key = current.key || current.index;
        const result = fn.call(this, current.value, key);
        if(result != null) return result;
    }
    return null;
};
