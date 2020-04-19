
export * from "./is";
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
export const equals = (...values)=>{
    // SameValueZero
    let prev = values.shift();
    return values.every(value=>(
        Number.isNaN(prev)?Number.isNaN(prev=value):prev===(prev=value)
    ));
};
export const typeOf = object=>(
    Object.prototype.toString.call(object).slice(8, -1)
);
/*
FIXME: typeof
export const typeof = object=>(
    modules.typeOf(object).toLowerCase()
);
TODO: require
*/
export const substitute = (value, substitute)=>(
    modules.isNullorUndefined(value)
        ? substitute
        : value
);
export const loop = (func, level, arg)=>{
    for(;level--;)arg = func(arg);
    return arg;
};
export const zip = function* (...arrays){
    const max = arrays.reduce((length, array)=>(
        Math.max(length, array.length)
    ), 0);
    for(let i=0;max>i;i++){
        yield arrays.reduce((iarrays, array)=>{
            iarrays.push(array[i]);
            return iarrays;
        }, []);
    }
};
