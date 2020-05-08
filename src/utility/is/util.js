
// @ts-check

import { has } from "../../object/property.js";
import { typeOf } from "../typeof.js";
import { isFunction, isNumber, isObject, isString } from "./type.js";

/**
 * 文字列かつ長さが1
 * @param {*} value
 * @return {Boolean}
 */
export const isChar = (value)=>(
    isString(value) && value.length === 1
);

/**
 * @param {*} value
 * @return {Boolean}
 */
export const isIteratorResult = (value)=>(
    isObject(value) && has(value, "value") || Boolean(value.done)
);

/**
 * @param {*} value
 * @return {Boolean}
 */
export const isIterator = (value)=>(
    isObject(value)
    && isFunction(value.next)
    && isIteratorResult(value.next())
);
/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether the value is iterable
 */
export const isIterable = (value)=>(
    isObject(value)
    && isFunction(value[Symbol.iterator])
    && isIterator(value[Symbol.iterator]())
);

/**
 * Array.isArrayかisArgumentsがtrueかどうか
 * 値がArrayLikeかどうか
 * @param {*} value The value to be compared
 * @return {Boolean} Whether the value is ArrayLike
 */
export const isArrayLike = (value)=>{
    if(!isObject(value))return false;
    return isNumber(value.length);
};

/**
 * Alpha:
 * @param {*} value The value to be compared
 * @return {Boolean} Whether the property does not exist
 */
export const isEmpty = (value)=>{
    if(isString(value) || isArrayLike(value))
        return value.length === 0;
    if(typeOf(value) === "Object")
        return Object.keys(value).length === 0;
    return false;
};

/**
 * Verify whether an error occurs when you execute it by passing the argument "args" to "func".
 * "func"に引数として"args"を渡して実行した場合にエラーが発生するか検証します。
 * @param {Function} func Function that verifies if an error occurs
 * @param  {...any} [args] Argument that verifies whether an error has occurred
 * @return {Boolean} Whether an error has occurred
 */
export const isThrowError = (func, ...args)=>{
    if(isFunction(func))return false;
    try{
        func.apply(void 0, args);
        return false;
    }catch(err){ return true; }
};
