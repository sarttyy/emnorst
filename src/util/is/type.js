
// @ts-check

import { typeOf } from "../typeof.js";

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether value is Undefined
 */
export const isUndefined = (value)=>(
    value === void 0
);

export const isDefined = (value)=>(
    value !== void 0
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether value is Null// or Undefined
 */
export const isNull = (value)=>(
    value === null
);

/**
 * 値のプロパティーにアクセス可能かの判定にも使用することができます
 * @param {*} value The value to be compared
 * @return {Boolean} Whether value is null or undefined
 */
export const isNullLike = (value)=>(
    isNull(value) || isUndefined(value)
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Boolean
 */
export const isBoolean = (value)=>(
    typeOf(value) === "Boolean"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is String
 */
export const isString = (value)=>(
    typeOf(value) === "String"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Number
 */
export const isNumber = (value)=>(
    typeOf(value) === "Number" && !isNaN(value)
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Symbol
 */
export const isSymbol = (value)=>(
    typeOf(value) === "Symbol"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Function
 */
export const isFunction = (value)=>(
    typeOf(value) === "Function"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether typeof is an object and is not Null
 */
export const isObject = (value)=>(
    typeof value === "object" && value !== null
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether properties can be edited
 */
export const isObjectLike = (value)=>(
    isFunction(value) || isObject(value)
);

export const isPureObject = (value)=>(
    typeOf(value) === "Object" && value.constructor === Object
);

/**
 * @type {Function}
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Array
 */
export const isArray = (value)=>(
    typeOf(value) === "Array"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Arguments
 */
export const isArguments = (value)=>(
    typeOf(value) === "Arguments"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is TypedArray
 */
export const isTypedArray = (value)=>(
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/
        .test(typeOf(value))
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is RegExp
 */
export const isRegExp = (value)=>(
    typeOf(value) === "RegExp"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Error
 */
export const isError = (value)=>(
    /Error$/.test(typeOf(value))
);

export const isPrimitive = (value)=>{
    const type = typeof value;
    return isNullLike(value)
        || type === "string"
        || type === "number"
        || type === "boolean"
        || type === "bigint"
        || type === "symbol";
};
