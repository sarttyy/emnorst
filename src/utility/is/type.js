
// @ts-check

import { typeOf } from "../typeof";

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Undefined
 */
export const isUndefined = (value)=>(
    value === void 0
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Null or Undefined
 */
export const isNull = (value)=>(
    value === null || isUndefined(value)
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether value is null or undefined
 */
export const isNullable = (value)=>(
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
    // eslint-disable-next-line no-self-compare
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
/**
 * @type {Function}
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Array
 */
export const isArray = Array.isArray || ((value)=>(
    typeOf(value) === "Array"
));

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Arguments
 */
export const isArguments = (value)=>(
    typeOf(value) === "Arguments"
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
    typeOf(value) === "Error"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Map
 */
export const isMap = (value)=>(
    typeOf(value) === "Map"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is WeakMap
 */
export const isWeakMap = (value)=>(
    typeOf(value) === "WeakMap"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is Set
 */
export const isSet = (value)=>(
    typeOf(value) === "Set"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is WeakSet
 */
export const isWeakSet = (value)=>(
    typeOf(value) === "WeakSet"
);

/**
 * @param {*} value The value to be compared
 * @return {Boolean} Whether {@link typeOf} is TypedArray
 */
export const isTypedArray = (value)=>(
    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/
        .test(typeOf(value))
);
