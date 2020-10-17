
import { isNumber } from "./number";

export const isPositive = (number: number): boolean => (
    isNumber(number) && (number === 0 ? 1 / number : number) > 0
);

export const isNegative = (number: number): boolean => (
    isNumber(number) && (number === 0 ? 1 / number : number) < 0
);
