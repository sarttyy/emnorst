
export const gurop = (array, func)=>{
    result = new Map();
    for(const value of array){
        const key = func(value)
        const values = result.get(key) || [];
        values.push(value);
        result.set(key, values);
    }
    return result;
};
// export const partition = (array, func)=>{};
// INFO: findのマッチした数版
export const count = (array, func)=>{
    let number = 0;
    for(const value of array)
        number += Boolean(func(value));
    return number;
};
export const previous = (level, func, arg)=>{
    for(;level--;)
        arg = func(arg);
    return arg;
};
export const inorder = (arg, ...funcs)=>{
    for(const func of funcs)
        arg = func(arg);
    return arg;
}
// TODO: iterate - 何でもループ"できるようにする"やつ
export const iterate = function* (value){
    if(value[Symbol.iterator])
        yield* value;
}
