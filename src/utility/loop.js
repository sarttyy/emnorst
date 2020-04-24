
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


export const forOf = (iterator, func, that)=>{
    for(const value of iterator){
        const flag = func.call(that, value);
        if(!isUndefined(flag))return flag;
    }
    return void 0;
};

export const forIndex = (maxIndex, func, that)=>(
    forOf(range(--maxIndex), index=>{
        const flag = func.call(that, index);
        if(!isUndefined(flag))return flag;
        return void 0;
    })
);

export const forIn = (object, func, that)=>{
    if(typeof object === "object")
        object = Object.entries(object);
    return forIndex(object.length, index=>(
        func.call(that, object[index])
    ));
};

export const doWhile = (func, that)=>{
    let flag;
    do flag = func.call(that);
    while(isUndefined(flag));
    return flag;
};
