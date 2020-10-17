
import { isInteger } from "../../number/is/integer";

export const isArrayLike = (value: any): value is ArrayLike<any> => {
    if(value == null || typeof value == "function")
        return false;
    return value.length >= 0 && isInteger(value.length);
};
