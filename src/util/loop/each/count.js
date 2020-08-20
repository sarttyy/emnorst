
import { Each } from "../base/each-class.js";

export const count = function(items, fn) {
    let count$ = 0;
    for(const each = new Each(items);each.continue();) {
        const { current } = each;
        const key = current.key || current.index;
        const result = fn.call(this, current.value, key);
        if(result) count$++;
    }
    return count$;
};
