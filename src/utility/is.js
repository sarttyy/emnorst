
import {typeOf} from "./index";
import {allKeys} from "../object/temp";

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Undefined
 */
export const isUndefined = value=>(
    value === void 0
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Null or Undefined
 */
export const isNull = value=>(
    value === null || isUndefined(value)
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Boolean
 */
export const isBoolean = value=>(
    typeOf(value) === "Boolean"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is String
 */
export const isString = value=>(
    typeOf(value) === "String"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Number
 */
export const isNumber = value=>(
    typeOf(value) === "Number"
);

/**
 * @param {*} value The value to be compared
 * @return Whether it is a negative number
 */
export const isNegative = value=>(
    isNumber(value) && value < 0
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Symbol
 */
export const isSymbol = value=>(
    typeOf(value) === "Symbol"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Function
 */
export const isFunction = value=>(
    typeOf(value) === "Function"
);

/**
 * @param {*} value The value to be compared
 * @return Whether typeof is an object and is not Null
 */
export const isObject = value=>(
    typeof value === "object" && value !== null
);

/**
 * @param {*} value The value to be compared
 * @return Whether properties can be edited
 */
export const isObjectLike = value=>(
    isFunction(value) || isObject(value)
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Arguments
 */
export const isArguments = value=>(
    typeOf(value) === "Arguments"
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
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is RegExp
 */
export const isRegExp = value=>(
    typeOf(value) === "RegExp"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Error
 */
export const isError = value=>(
    typeOf(value) === "Error"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Map
 */
export const isMap = value=>(
    typeOf(value) === "Map"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is WeakMap
 */
export const isWeakMap = value=>(
    typeOf(value) === "WeakMap"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is Set
 */
export const isSet = value=>(
    typeOf(value) === "Set"
);

/**
 * @param {*} value The value to be compared
 * @return Whether {@link typeOf} is WeakSet
 */
export const isWeakSet = value=>(
    typeOf(value) === "WeakSet"
);

/**
 * Verify whether an error occurs when you execute it by passing the argument "args" to "func".
 * "func"に引数として"args"を渡して実行した場合にエラーが発生するか検証します。
 * @param {Function} func Function that verifies if an error occurs
 * @param  {...any} [args] Argument that verifies whether an error has occurred
 * @return Whether an error has occurred
 */
export const isThrowError = (func, ...args)=>{
    try{
        func.apply(this, args);
        return false;
    }catch(err){ return true; }
};
