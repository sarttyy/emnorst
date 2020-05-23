
// @ts-check

import { swap } from "../../object/property/swap";

/**
 * @typedef {function(any, any): boolean} compare
 */

/**
 * @param {any[]} origin
 * @param {number} p
 * @param {number} q
 * @param {compare} compare
 */
const downheap = (origin, p, q, compare)=>{
    let c;
    const temp = origin[p];
    while((c = 2 * p + 1) <= q){
        if(c < q && compare(origin[c], origin[c + 1]))
            c++;
        if(compare(origin[c], temp))
            break;
        origin[p] = origin[c];
        p = c;
    }
    origin[p] = temp;
};

/**
 * @param {any[]} origin
 * @param {compare} compare
 */
export const heapSort = (origin, compare)=>{
    const N = origin.length, M = N - 1;
    if(N < 2)return origin;
    for(let p = N / 2;p;)
        downheap(origin, --p, M, compare);
    for(let q = M;q;){
        swap(origin, 0, q);
        downheap(origin, 0, --q, compare);
    }
    return origin;
};
