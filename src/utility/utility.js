
import {isObject} from "./is/index";

// TODO: format

export const equals = (...values)=>{
    // SameValueZero
    let prev = values.shift();
    return values.every(value=>(
        Number.isNaN(prev)
            ? Number.isNaN(prev=value)
            : prev===(prev=value)
    ));
};

export const toPrimitive = value=>{
    if(!isObject(value))
        return value;
    if("valueOf" in value)
        return value.valueOf();
    if("toString" in value)
        return value.toString();
    if(Symbol && Symbol.toPrimitive in value)
        return value[Symbol.toPrimitive]("default");
    return value;
};

export const debounce = (func, wait)=>{
    let id;
    return function(){
        clearTimeout(id);
        // eslint-disable-next-line
        id = setTimeout(func.apply, wait, this, arguments);
    };
};

export const uniq = array=>{
    const existings = [];
    return array.filter(value=>{
        const existing = existings.includes(value);
        if(!existing)existings.push(value);
        return !existing;
    });
};
