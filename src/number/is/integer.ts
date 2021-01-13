
import { Opaque } from "../../util/standard/opaque";
import { isNumber } from "./number";

export const isInteger = (number: unknown): number is Opaque<number, {int:true}> => (
    isNumber(number) && Number.isInteger(+number)
);
