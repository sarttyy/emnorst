
/**
 * @typedef {"Int8Array"|
 * "Uint8Array"|
 * "Uint8ClampedArray"|
 * "Int16Array"|
 * "Uint16Array"|
 * "Int32Array"|
 * "Uint32Array"|
 * "Float32Array"|
 * "Float64Array"} TypedArray
 */

/**
 * デフォルトで`Object.prototype.toString.call`の返り値として考えられるすべてのパターンです。
 * たぶん。
 *
 * @typedef {"Null"|
 * "Undefined"|
 * "Number"|
 * "String"|
 * "Boolean"|
 * "Symbol"|
 * "Function"|
 * "Object"|
 * "Array"|
 * "Arguments"|
 * "RegExp"|
 * "Date"|
 * "Math"|
 * "JSON"|
 * "Error"|
 * "Promise"|
 * "Map"|
 * "Set"|
 * "WeakMap"|
 * "WeakSet"|
 * "GeneratorFunction"|
 * "Generator"|
 * TypedArray|
 * "ArrayBuffer"|
 * "DataView"}
 * ObjectToStringTypes
 */

/**
 * You can add the type by changing the "Symbol.toStringTag" property of the object.
 * オブジェクトの"Symbol.toStringTag"プロパティーを変更することで、型を追加できます。
 * @param {*} value An object that determines the type
 * @return {ObjectToStringTypes & String} object type
 */
export const typeOf = (value)=>(
    Object.prototype.toString.call(value).slice(8, -1)
);
