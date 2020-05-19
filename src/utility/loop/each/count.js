
// @ts-check

import { foldLeft } from "../fold.js";

/**
 * @param {*} items
 * @param {function(any, string=): boolean} func
 * @return {number} eachしてfuncがtruelyの値を返した数
 */
export const count = function(items, func){
    return foldLeft(items, (match, value, key)=>{
        const flag = func.call(this, value, key);
        return match + Boolean(flag);
    }, 0);
};
