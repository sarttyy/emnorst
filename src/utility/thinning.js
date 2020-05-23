
// @ts-check

import { isNull } from "../util/is/index.js";

/**
 * @typedef {function(...any): void} voidFn
 */

/**
 * 高階関数。一度実行してから一定時間内に発生した処理を無視、
 * 一定期間呼び出されなかった場合も実行する。
 * @param {voidFn} func
 * @param {number} wait 待機時間
 * @return {voidFn}
 */
export const throttle = (func, wait=1000)=>{
    let id = null, waiting = false, context, args;
    return function(){
        if(isNull(id)){
            func.apply(this, arguments);
            id = setTimeout(()=>{
                waiting && func.apply(context, args);
                waiting = false;
                id = null;
            }, wait);
        }else{
            waiting = true;
            context = this;
            args = arguments;
        }
    };
};

/**
 * 高階関数。呼び出されてから一定期間呼び出されなかった場合に実行する。
 * @param {voidFn} func
 * @param {number} wait 待機時間
 * @return {voidFn}
 */
export const debounce = (func, wait=1000)=>{
    let id;
    return function(){
        clearTimeout(id);
        id = setTimeout(()=>{
            func.apply(this, arguments);
        }, wait);
    };
};
