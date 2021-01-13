
import { isNumber } from "number/is/number";
import { isFunction } from "util/is/function";
import type { CompareOrder } from "./types";

/**
 * Compare values with comparator and returns boolean value.
 *
 * @param left value to compare on left.
 * @param right value to compare on right.
 * @param comparator comparison function or boolean value, true if less than, false if greater than.
 */
export const compare = <T>(
    left: T,
    right: T,
    comparator: CompareOrder<T> = true,
): boolean => {
    const dir = (isFunction(comparator)
        ? comparator(left, right)
        : comparator ? left < right : left > right
    );
    return isNumber(dir) ? dir > 0 : Boolean(dir);
};
