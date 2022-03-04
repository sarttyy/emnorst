import { clamp } from "~/number/util";
import { MAX_INT32 } from "~/number/int32";

export const randString = (length: number): string => {
    const len = clamp(length, 0, MAX_INT32) | 0 || 8;

    let randStr = "";
    do {
        // Discard the first "0." and the last digit of the bias.
        randStr += Math.random().toString(36).slice(2, -1);
    } while(randStr.length < len);

    return randStr.slice(-len);
};
