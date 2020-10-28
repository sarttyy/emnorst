
import { Each } from "../base/each-class.js";
import { copyType } from "../../../object/clone/copyType.js";

export const group = function(items, fn) {
    const groups = copyType(items);
    for(const each = new Each(items);each.continue();) {
        const { current } = each;
        const key = current.key || current.index;
        const entry = fn.call(this, current.value, key);
        if(!groups[entry]) groups[entry] = [];
        groups[entry].push(current.value);
    }
    return groups;
};
