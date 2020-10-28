
import { isNumber } from "./number";

export const isInteger = (number: unknown): boolean => (
    isNumber(number) && Number.isInteger(+number)
);
