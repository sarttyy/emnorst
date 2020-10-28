
import { Each } from "../base/each-class.js";
import { copyType } from "../../../object/clone/copyType.js";

export const filter = function(items, fn) {
    const filtered = copyType(items);
    for(const each = new Each(items);each.continue();) {
        const { current } = each;
        const key = current.key || current.index;
        const result = fn.call(this, current.value, key);
        if(result) filtered[key] = current.value;
    }
    return filtered;
};
