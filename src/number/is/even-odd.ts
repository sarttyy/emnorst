
import type { Opaque } from "../../util/standard/opaque";

export const isEven = (number: number): number is Opaque<number, {int:true;even:true}> => (
    number % 2 === 0
);

export const isOdd = (number: number): number is Opaque<number, {int:true;even:false}> => (
    number % 2 === 1
);
