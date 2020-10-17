
import { isInteger } from "../../../number/is/integer";
import { isLowerChar, isUpperChar } from "./letter";
import { isString } from "./string";

export const isUpperCase = (value) => {
    if(isInteger(value))
        return isUpperChar(value);
    if(isString(value)) {
        let someUpper = false;
        for(let i = 0;i < value.length;) {
            const cher = value[i++];
            if(isLowerChar(cher))
                return false;
            if(!someUpper && isUpperChar(cher))
                someUpper = true;
        }
        return someUpper;
    }
    return false;
};
