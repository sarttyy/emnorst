import { assert } from "~/util/types";

/**
 * @param value The value to be compared
 * @return Whether the value is iterable
 */
export const isIterable = (value: unknown): value is Iterable<unknown> => {
    if(value == null) {
        return false;
    }
    assert.type<Iterable<unknown>>(value);
    return typeof value[Symbol.iterator] === "function";
};
