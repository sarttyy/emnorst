
import { forOf } from "../../../utility/loop/for-of";
import { equals } from "../../is/equals";

export const memolize = (func) => {
    const cache = new Map();
    return function() {
        const fn = (arg, i) => equals(arg, arguments[i]);
        forOf(cache, (cacheN) => {
            const eqLength = cacheN[0].length === arguments.length;
            const eq = eqLength && cacheN[0].every(fn);
            return eq ? cacheN[1] : void 0;
        });
        const result = func(...arguments);
        cache.set([...arguments], result);
        return result;
    };
};
