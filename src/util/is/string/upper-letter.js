
import { isInteger } from "../number/integer.js";
import { isString } from "./string.js";

export const isUpperLetter = (charCode) => (
    isString(charCode)
        ? isUpperLetter(charCode.charCodeAt())
        : charCode > 0x40 && charCode <= 0x5a
            && isInteger(charCode)
);
