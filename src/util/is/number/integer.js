
import { isNumber } from "./number.js";

export const isInteger = (number) => (
    isNumber(number) && Number.isInteger(number.valueOf())
);
