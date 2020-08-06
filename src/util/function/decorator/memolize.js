
import { Each } from "../../loop/base/each-class.js";
import { equals } from "../../is/equals/equals.js";

export const memolize = (func, eq=equals) => {
    const cache = {};
    return function() {
        const { length } = arguments;
        if(length in cache) {
            if(length === 0) return cache[0];
            const fn = (arg, i) => eq(arg, arguments[i]);
            for(const each = new Each(cache[length], "iterable");each.continue();)
                if(each.current.value[0].every(fn))
                    return each.current.value[1];
        }else cache[length] = new Map();
        const result = func.apply(this, arguments);
        if(length === 0) cache[0] = result;
        else cache[length].set([...arguments], result);
        return result;
    };
};
