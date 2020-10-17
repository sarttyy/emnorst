
import { isNumber } from "./number.js";

export const isInteger = (number: any): boolean => (
    isNumber(number) && Number.isInteger(+number)
);
