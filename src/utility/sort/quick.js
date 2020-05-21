
// @ts-check

import { average } from "../../math/index";
import { swap } from "../../object/exchange";

/**
 * destructive: `true`,
 * in-place: `true`,
 * stable: `false`,
 * not-number: `true`
 */
export const quickSort = (origin, compare=(a, b)=>a >= b, left=0, right=origin.length)=>{
    if(right - left <= 1)return origin;
    const pivotIndex = Math.floor(average(left, right));
    const pivot = origin[pivotIndex];
    const limit = right - 1;
    swap(origin, pivotIndex, limit);
    let j = left;
    for(let i = left;i < limit;i++)
        if(compare(origin[i], pivot))
            swap(origin, i, j++);
    swap(origin, j, limit);
    quickSort(origin, compare, left, j);
    quickSort(origin, compare, j + 1, right);
    return origin;
};
