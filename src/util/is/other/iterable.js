
import { isObject } from "../object/object.js";
import { isFunction } from "./function.js";

const isIterator = (value) => (
    isObject(value) && isFunction(value.next)
);

/**
 * @param {*} value The value to be compared
 * @return {boolean} Whether the value is iterable
 */
export const isIterable = (value) => (
    isObject(value)
    && isFunction(value[Symbol.iterator])
    && isIterator(value[Symbol.iterator]())
);
