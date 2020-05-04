
import { isObject } from "./is/index";

// TODO: format

/**
 * Alpha:
 * @param {String[]} strings
 * @param  {...any} rawStrings
 */
const r = (strings, ...rawStrings)=>{
    console.log(strings);
    const result = [];
    for(const __ of rawStrings){
        result.push(strings.pop());
        result.push(__);
    }
    return result;
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

export const uniq = array=>{
    const existings = [];
    return array.filter(value=>{
        const existing = existings.includes(value);
        if(!existing)existings.push(value);
        return !existing;
    });
};
