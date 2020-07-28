
import { is } from "../equals/is.js";
import { isNumber } from "./number.js";

export const isNegative = (number) => (
    isNumber(number) && number < 0
        || is(-0, Number(number))
);
