
import type { Meta } from "util/standard/types";
import { isNumber } from "./number";

export const isInteger = (number: unknown): number is Meta<number, {int:true}> => (
    isNumber(number) && Number.isInteger(+number)
);
