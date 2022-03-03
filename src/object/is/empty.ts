import { toStringTag } from "~/util/type-of";
import { getEnumerableKeys } from "../property";
import { isArrayLike } from "../array-like";

interface EmptyObject {
    [key: string]: never;
}

interface EmptyArrayLike {
    length: 0;
}

export type Empty = "" | [] | EmptyArrayLike | EmptyObject;

export const isEmpty = (value: unknown): value is Empty => {
    if(isArrayLike(value)) {
        return value.length === 0;
    }
    if(toStringTag(value) === "Object") {
        return getEnumerableKeys(value as object).length === 0;
    }
    return false;
};
