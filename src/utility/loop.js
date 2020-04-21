
import * as is from "./is";

export const gurop = (array, func)=>{
    const result = new Map();
    for(const value of array){
        const key = func(value);
        const values = result.get(key) || [];
        values.push(value);
        result.set(key, values);
    }
    return result;
};
// export const partition = (array, func)=>{};
// INFO: findのマッチした数版
export const count = (array, func)=>{
    let match = 0;
    for(const value of array)
        match += Boolean(func(value));
    return match;
};

export const previous = (level, func, arg)=>{
    for(;level--;)
        arg = func(arg);
    return arg;
};

export const inOrder = (arg, ...funcs)=>{
    for(const func of funcs)
        arg = func(arg);
    return arg;
};

// TODO: iterate - 何でもループ"できるようにする"やつ
export const iterate = function* (value){
    if(value[Symbol.iterator])
        yield* value;
};

export const forOf = (iterator, func, that)=>{
    for(const value of iterator){
        const flag = func.call(that, value);
        if(!is.isUndefined(flag))return flag;
    }
    return void 0;
};
