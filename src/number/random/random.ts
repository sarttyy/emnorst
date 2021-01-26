
import { xorShift128 } from "./xorshift";
import { MAX_BIT_NUMBER } from "../util/constant";

const next = xorShift128();

/**
 *
 */
export const random = (min=1, max=0): number => {
    /** Random number of 0 through 1 */
    const rand = next() / MAX_BIT_NUMBER;
    return min + rand * (max - min);
};
