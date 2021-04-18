
import type { Meta } from "util/standard/types";

export const isInfinity = (number: unknown): number is Meta<number, {inf:true}> => (
    number === Infinity || number === -Infinity
);
