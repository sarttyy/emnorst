
import { isInteger } from "../number/integer.js";
import { isString } from "./string.js";

const isLowerLetter = (charCode) => (
    isString(charCode)
        ? isLowerLetter(charCode.charCodeAt())
        : charCode > 0x60 && charCode <= 0x7a
            && isInteger(charCode)
);
