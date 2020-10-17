
import { isInteger } from "../../../number/is/integer";
import { isLowerChar, isUpperChar } from "./letter";
import { isString } from "./string";

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
