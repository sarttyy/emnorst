
import type { Opaque } from "util/standard/opaque";

export const isInfinity = (number: unknown): number is Opaque<number, {inf:true}> => (
    number === Infinity || number === -Infinity
);
