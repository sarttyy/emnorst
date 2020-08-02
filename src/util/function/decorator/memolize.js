
import { Each } from "../../loop/base/each-class.js";
import { equals } from "../../is/equals/equals.js";

export const memolize = (func) => {
    const cache = {};
    return function() {
        const { length } = arguments;
        if(cache[length]) {
            const fn = (arg, i) => equals(arg, arguments[i]);
            for(const each = new Each(cache[length], { mode: "iterable" });each.continue();)
                if(each.current.value[0].every(fn))
                    return each.current.value[1];
        }else cache[length] = new Map();
        const result = func(...arguments);
        cache[length].set([...arguments], result);
        return result;
    };
};
