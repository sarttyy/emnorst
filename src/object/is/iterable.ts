
import { isFunction } from "../../util/is/other/function.js";

/**
 * @param value The value to be compared
 * @return Whether the value is iterable
 */
export const isIterable = (value: any): value is Iterable<any> => (
    value != null && isFunction(value[Symbol.iterator])
);
