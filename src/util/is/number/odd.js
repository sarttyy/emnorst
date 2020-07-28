
import { isNumber } from "./number.js";

export const isOdd = (number) => (
    isNumber(number) && number % 2 === 1
);
