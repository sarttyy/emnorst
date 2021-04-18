
import { typeOf } from "util/standard/type-of";
import { Empty } from "../standard/types";
import { getKeys } from "../standard/keys";
import { isArrayLike } from "./array-like";

export const isEmpty = (value: unknown): value is Empty => {
    if(isArrayLike(value))
        return value.length === 0;
    if(typeOf(value) === "Object")
        return getKeys(value as object).length === 0;
    return false;
};
