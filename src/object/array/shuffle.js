
// @ts-check

import { swap } from "../property/swap";
import { xorshift } from "../../util/random/xorshift";

export const shuffle = (data) => {
    for(let i = data.length - 1;i--;) {
        const r = xorshift(0, i);
        swap(data, i, r);
    }
    return data;
};
