
import { isInteger } from "../number/integer.js";

export const isArrayLike = (value) => {
    if(value == null || typeof value == "function")
        return false;
    return value.length >= 0 && isInteger(value.length);
};
