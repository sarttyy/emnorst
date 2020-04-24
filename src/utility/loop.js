
import {isUndefined} from "./is";
import {range} from "./range";

const propGetter = value=>value;

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
 * Receives an Iterable object and calls a callback function for each value.
 * Iterableなオブジェクトを受け取って値ごとにコールバック関数を呼び出します。
 * @param {Iterable} iterator An Iterable object used for the loop
 * @param {Function} func
 * A callback function that is executed for each value of the Iterable object
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 * @param {*} [that] Specify this of the callback function
 */
export const forOf = (iterator, func, that)=>{
    for(const value of iterator){
        const flag = func.call(that, value);
        if(!isUndefined(flag))return flag;
    }
    return void 0;
};

/**
 * Call the callback function for each number from 0 to maxIndex.
 * 0からmaxIndexまでの数値ごとにコールバック関数を呼び出します。
 * @param {Number} maxIndex Repeats this number of times
 * @param {Function} func
 * Callback function that is executed maxIndex times
 * When a value other than undefined is returned,
 * the loop is terminated and the value is returned.
 * @param {*} [that] Specify this of the callback function
 */
export const forIndex = (maxIndex, func, that)=>(
    forOf(range(--maxIndex), index=>{
        const flag = func.call(that, index);
        if(!isUndefined(flag))return flag;
        return void 0;
    })
);

/**
 * @deprecated
 * @param {*} object
 * @param {*} func
 * @param {*} [that]
 */
export const forIn = (object, func, that)=>{
    if(typeof object === "object")
        object = Object.entries(object);
    return forIndex(object.length, index=>(
        func.call(that, object[index])
    ));
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
