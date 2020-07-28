
import * as context from "../../../env/symbol.js";
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
    && isFunction(value[context.Symbol.iterator])
    && isIterator(value[context.Symbol.iterator]())
);
