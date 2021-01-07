
import { Opaque } from "../../util/standard/opaque";
import { isNumber } from "./number";

export const isPositive = (number: number): number is Opaque<number, {sign:true}> => (
    isNumber(number) && (number === 0 ? 1 / number : number) > 0
);

export const isNegative = (number: number): number is Opaque<number, {sign:false}> => (
    isNumber(number) && (number === 0 ? 1 / number : number) < 0
);
