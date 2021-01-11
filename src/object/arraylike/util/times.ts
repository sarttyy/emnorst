
import { isFunction } from "util/is/function";

type Fn<T> = (index: number, prev: T | undefined, array: readonly T[]) => T;

/**
 * Create array with specified length and filled with elements.
 *
 * @param count length of array to generate.
 * @param value array element or function that returns array element.
 * @example
 * const arr = times<number>(4, (idx, prev=0) => idx + prev);
 * // => [0, 1, 3, 6]
 * @example
 * const arr = times(3, "hoge");
 * // => ["hoge", "hoge", "hoge"]
 */
export const times = <T>(count: number, value: Fn<T> | Exclude<T, Function>): T[] => {
    const arr: T[] = [];

    let i = 0;
    if(isFunction(value)) {
        let prev!: T;
        while(i < count) {
            prev = arr[i] = value(i++, prev, arr);
        }
    } else {
        while(i < count) {
            arr[i++] = value;
        }
    }

    return arr;
};
