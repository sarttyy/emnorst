
import type { Meta } from "util/standard/types";
import { isNumber } from "./number";

export const isPositive = (number: number): number is Meta<number, {sign:true}> => (
    isNumber(number) && (number === 0 ? 1 / number : number) > 0
);

export const isNegative = (number: number): number is Meta<number, {sign:false}> => (
    isNumber(number) && (number === 0 ? 1 / number : number) < 0
);
