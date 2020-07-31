
import { isObject } from "../../is/object/object.js";

/**
 * @template T
 * @param {*} data
 * @param {(any, number, any) => IteratorResult<T> | void} next
 * @return {Iterator<T>}
 */
export const iterator = (data, next) => {
    let count = 0, done = false;
    return { next(arg) {
        if(done) return { done: true };
        let result = next.call(this, data, count++, arg);
        isObject(result) || (result = {
            done: result === void 0,
            value: result
        });
        done = result.done;
        return result;
    } };
};
