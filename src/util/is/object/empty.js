
import { isArrayLike } from "./array-like.js";
import { typeOf } from "../../typeof.js";
import { getKeys } from "../../../object/standard/keys.js";

export const isEmpty = (value) => {
    if(isArrayLike(value))
        return value.length === 0;
    if(typeOf(value) === "Object")
        return getKeys(value).length === 0;
    return false;
};
