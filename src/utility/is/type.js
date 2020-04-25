
import {typeOf} from "../index";

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
