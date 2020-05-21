
// @ts-check

import { average } from "../../math/index";
import { swap } from "../../object/exchange";
import { heapSort } from "./heap";

/**
 * @param {any} a
 * @param {number} b
 * @param {any} c
 * @param {(arg0: any, arg1: any) => any} [compare]
 */
const median3 = (a, b, c, compare)=>(
    compare(a, b)
        ? (compare(b, c) ? b : compare(c, a) ? a : c)
        : (compare(c, b) ? b : compare(a, c) ? a : c)
);

/**
 * @param {{ [x: string]: any; }} origin
 * @param {number} n
 * @param {number} i
 * @param {number} depth
 * @param {any} compare
 */
const pseudoMedian = (origin, n, i, depth, compare)=>{
    if(n <= depth)return origin[i + n/2];
    const m = n / 3,
        x = pseudoMedian(origin, m, i, depth, compare),
        y = pseudoMedian(origin, n - 2*m, i + m, depth, compare),
        z = pseudoMedian(origin, m, i + n - m, depth, compare);
    return median3(x, y, z, compare);
};

/**
 * destructive: `true`,
 * in-place: `true`,
 * stable: `false`,
 * not-number: `true`
 */
/**
 * @param {{ [x: string]: any; }} origin
 * @param {{ (a: any, b: any): boolean; (arg0: any, arg1: any): any; }} compare
 * @param {number} left
 * @param {number} right
 * @param {number} [depth]
 */
const sort = (origin, compare, left, right, depth)=>{
    if(right - left <= 1)return origin;
    const pivotIndex = Math.floor(average(left, right));
    // const pivot = pseudoMedian(origin, right - left, left, depth, compare);
    const pivot = median3(left, pivotIndex, right, compare);
    // const pivot = origin[pivotIndex];
    const limit = right - 1;
    // swap(origin, pivotIndex, limit);
    let j = left;
    for(let i = left;i < limit;i++)
        if(compare(origin[i], pivot))
            swap(origin, i, j++);
    swap(origin, j, limit);
    sort(origin, compare, left, j);
    sort(origin, compare, j + 1, right);
    return origin;
};

/**
 * @param {number[]} a
 * @param {number} i0
 * @param {number} iN
 */
const insertionsort = (a, i0, iN)=>{
    if(iN - i0 < 2)return;
    for(let i = i0 + 1;i < iN;i++){
        const tmp = a[i];
        let j = i, k = i;
        if(tmp < a[i0])
            while(i0 < j){
                a[j] = a[--k];
                j = k;
            }
        else
            while(tmp < a[--k]){
                a[j] = a[k];
                j = k;
            }
        a[j] = tmp;
    }
};

/**
 * @param {any[]} a
 * @param {number} i0
 * @param {number} iN
 * @param {number} d
 */
const sort2 = (a, i0, iN, d, compare)=>{
    const N = iN - i0;
    if(N < 40)return insertionsort(a, i0, iN);
    if(d === 0)return heapSort(a, compare);
    let i = i0, j = iN - 1;
    const pivot = median3(a[i], a[(i + j) / 2], a[j]);
    for(;;){
        while (a[i] < pivot) i++;
        while (pivot < a[j]) j--;
        if (i >= j) break;
        swap(a, i, j);
        i++;
        j--;
    }
    j++;
    const d2 = d - 1;
    if (i - i0 > 1) sort2(a, i0, i, d2, compare);
    if (iN - j > 1) sort2(a, j, iN, d2, compare);
    return a;
};

export const introSort = (origin, compare=(a, b)=>a >= b)=>{
    let size = origin.length;
    if(size < 2)return origin;
    console.log(size);
    let depth = 0;
    for(;size > 0;size /= 2)depth++;
    console.log(depth);
    return sort(origin, compare, 0, origin.length, 2 * depth);
};
