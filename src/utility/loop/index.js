
export * from "./for";

import {isUndefined} from "../is/index";

const propGetter = key=>obj=>obj[key];

export const previous = (level, func, arg)=>{
    for(;level--;)arg = func(arg);
    return arg;
};

export const inOrder = (arg, ...orders)=>{
    for(const func of orders)
        arg = func(arg);
    return arg;
};

// TODO: iterate - 何でもループ"できるようにする"やつ
export const iterate = function* (value){
    if(value[Symbol.iterator])
        yield* value;
    (function(){
        return {
            next(){
                return {
                    value: void 0,
                    done: false
                };
            }
        };
    }).call(value);
};

/**
 * MEMO: ループ条件とreturnをどうにかして引き剥がしたい。
 * MEMO: do取りたい。flag初期値追加。
 * @param {Function} func Callback function that continues to run as long as it returns undefined
 * @param {*} [that] Specify this of the callback function
 */
export const doWhile = (func, that)=>{
    let flag;
    do flag = func.call(that);
    while(isUndefined(flag));
    return flag;
};
