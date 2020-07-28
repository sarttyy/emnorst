
import { isFunction } from "../other/function.js";
import { isNullLike } from "../other/null-like.js";
import { isInteger } from "../number/integer.js";
import { isPositive } from "../number/positive.js";

export const isArrayLike = (value) => {
    if(isNullLike(value) || isFunction(value))
        return false;
    return isPositive(value.length) && isInteger(value.length);
};
