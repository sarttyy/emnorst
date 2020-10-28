
import { isArrayLike } from "./array-like";
import { typeOf } from "../../util/standard/type-of";
import { getKeys } from "../standard/keys";

export const isEmpty = (value: any): boolean => {
    if(isArrayLike(value))
        return value.length === 0;
    if(typeOf(value) === "Object")
        return getKeys(value).length === 0;
    return false;
};
