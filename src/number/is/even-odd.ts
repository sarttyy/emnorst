
import type { Meta } from "util/standard/types";

export const isEven = (number: number): number is Meta<number, {int:true;even:true}> => (
    number % 2 === 0
);

export const isOdd = (number: number): number is Meta<number, {int:true;even:false}> => (
    number % 2 === 1
);
