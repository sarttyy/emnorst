
// @ts-check

import { isArrayLike, isNumber, isUndefined } from "../is/index.js";

/**
 * TODO: 素のfor i:にする
 * Call the callback function for each number from 0 to maxIndex.
 * 0からmaxIndexまでの数値ごとにコールバック関数を呼び出します。
 * @param {*} count Repeats this number of times
 * @param {function(Number): any} func
 * Callback function that is executed maxIndex times
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 * @param {function(any): Boolean} [breakFunc]
 */
export const forIndex = function(count, func, breakFunc=isUndefined){
    if(isArrayLike(count)){
        for(let index = 0;index < count.length;index++){
            const flag = func.call(this, index);
            if(!breakFunc(flag))return flag;
        }
    }
    if(isNumber(count)){
        const step = Math.sign(count),
            isNeg = step === -1,
            goal = isNeg ? -1 : count;
        for(let index = isNeg ? -count + -1 : 0;
            index !== goal;index += step){
            const flag = func.call(this, index);
            if(!breakFunc(flag))return flag;
        }
    }
    return void 0;
    // return forOf.call(this, range(--count), func, breakFunc);
};
