
import { isArrayLike } from "../../is/object/array-like.js";
import { isFunction } from "../../is/other/function.js";
import { iterator } from "./iterator.js";

const next = (data, i) => ({
    done: i < data.length,
    value: data[i]
});

/**
 * iterableなオブジェクトをiteratorに変換します。
 * @template T
 * @param {Iterable<T> | ArrayLike<T>} iterable
 * @return {Iterator<T, null>}
 * @throws {TypeError}
 */
export const iterate = (iterable) => {
    if(isFunction(iterable[Symbol.iterator]))
        return iterable[Symbol.iterator]();
    if(isFunction(iterable["@@iterator"]))
        return iterable["@@iterator"]();
    if(isArrayLike(iterable))
        return iterator(iterable, next);
    throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
};
