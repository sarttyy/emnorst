
import { assert } from "util/standard/assert";
import { decimal, lowerAlphabet, upperAlphabet } from "util/string/constant";

const baseTable = decimal + lowerAlphabet + upperAlphabet;

export const toBaseN = (num: number, radix?: number): string => {
    assert.type<number>(radix);
    radix = (0 < radix && radix < 63) ? radix | 0 : 10;
    num |= 0;
    if(num < 0) return "-" + toBaseN(-num, radix);

    let baseNStr = "";
    while(num > 0) {
        const i = num % radix;
        baseNStr = baseTable[i] + baseNStr;
        num -= i;
        num /= radix;
    }
    return baseNStr || "0";
};
