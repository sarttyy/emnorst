
import { Iterable } from "./iterable.js";
import { iterate } from "./iterate.js";

/**
 * @param {Iterable} iterable
 * @param {function} func
 * @return {Iterable}
 */
export const iterableMap = (iterable, func) => (
    new Iterable(iterate(iterable), (iterator) => {
        const iterResult = iterator.next();
        if(!iterResult.done)
            iterResult.value = func(iterResult.value);
        return iterResult;
    })
);
