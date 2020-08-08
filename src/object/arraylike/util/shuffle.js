
// @ts-check

import { xorshift } from "../../../util/random/xorshift.js";
import { copyType } from "../../clone/copyType.js";
import { swap } from "../../property/swap.js";

export const shuffle = (origin, copy=false) => {
    const result = copy ? copyType(origin) : origin;
    for(let i = origin.length;i--;) {
        const r = xorshift(0, i);
        swap(origin, i, r, result);
    }
    return result;
};
