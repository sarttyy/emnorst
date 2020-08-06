
import { isInteger } from "../number/integer.js";
import { isLowerChar, isUpperChar } from "./letter.js";
import { isString } from "./string.js";

export const isLowerCase = (value) => {
    if(isInteger(value))
        return isLowerChar(value);
    if(isString(value)) {
        let someLower = false;
        for(let i = 0;i < value.length;) {
            const cher = value[i++];
            if(isUpperChar(cher))
                return false;
            if(!someLower && isLowerChar(cher))
                someLower = true;
        }
        return someLower;
    }
    return false;
};
