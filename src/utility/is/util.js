
import {typeOf} from "../index";
import {allKeys} from "../../object/temp";
import {isNumber, isObject, isArguments} from "./type";

/**
 * @param {*} value The value to be compared
 * @return Whether it is a negative number
 */
export const isNegative = value=>(
    isNumber(value) && value < 0
);

/**
 * Array.isArrayかisArgumentsがtrueかどうか
 * Alpha: 値がArrayLikeかどうか
 * @param {*} value The value to be compared
 * @return Whether the value is ArrayLike
 */
export const isArrayLike = value=>{
    if(!isObject(value))return false;
    if(Array.isArray(value) || isArguments(value) || value.length === 0)
        return true;
    return false;
};

/**
 * Alpha:
 * @param {*} value The value to be compared
 * @return Whether the property does not exist
 */
export const isEmpty = value=>{
    if(typeOf(value) === "String" || isArrayLike(value))
        return value.length === 0;
    if(typeOf(value) === "Object")
        return allKeys(value).length === 0;
    return false;
};

/**
 * Verify whether an error occurs when you execute it by passing the argument "args" to "func".
 * "func"に引数として"args"を渡して実行した場合にエラーが発生するか検証します。
 * @param {Function} func Function that verifies if an error occurs
 * @param  {...any} [args] Argument that verifies whether an error has occurred
 * @return Whether an error has occurred
 */
export const isThrowError = (func, ...args)=>{
    try{
        func.apply(void 0, args);
        return false;
    }catch(err){ return true; }
};
