
import {typeOf} from "./index";
import * as object from "../object/temp";

export const isUndefined = value=>(
    value === void 0
);

export const isNull = value=>(
    value === null || isUndefined(value)
);

export const isRegExp = obj=>(
    typeOf(obj) === "RegExp"
);

export const isObject = obj=>(
    typeof obj === "object" && obj !== null
);

export const isObjectLike = obj=>(
    typeof obj === "function" || isObject(obj)
);

export const isArrayLike = obj=>{
    if(!isObject(obj))return false;
    if(Array.isArray(obj) || typeOf(obj) === "Arguments" || obj.length === 0)
        return true;
    return false;
};

export const isEmpty = value=>{
    if(typeOf(value) === "String" || isArrayLike(value))
        return value.length === 0;
    if(typeOf(value) === "Object")
        return object.allKeys(value).length === 0;
    return false;
};

export const isNumber = value=>{
    const type = typeOf(value) === "Number";
    return type || /[+-]?\d+(\.)?/.test(value);
};

export const isNegative = value=>{
    if(typeOf(value) === "Number")
        return value < 0;
    if(typeOf(value) === "Boolean")
        return !value;
    return false;
};
