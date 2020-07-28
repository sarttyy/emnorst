
import { isNumber } from "./number.js";

export const isEven = (number) => (
    isNumber(number) && number % 2 === 0
);
