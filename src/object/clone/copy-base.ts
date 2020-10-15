
import { isObject } from "../is/object";
import { typeOf } from "../../util/standard/type-of";
// import { isTypedArray } from "../is/typed-array";
// import { Arguments as $Arguments } from "../../util/function/simple/arguments";

/**
 * Create object with copy of prototype.
 *
 * @param object
 */
export const copyPrototype = (object: object): object => {
    if(object == null) return null;

    const prototype = Object.getPrototypeOf(object);
    return Object.create(prototype);
};
// const copyArrayBuffer = (buffer) => (
//     new buffer.constructor(buffer.byteLength)
// );
// const copyTypedArray = (typedArray) => {
//     const buffer = copyArrayBuffer(typedArray.buffer);
//     return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
// };
// const copyDataView = (dataView) => {
//     const buffer = copyArrayBuffer(dataView.buffer);
//     return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
// };
// export const copyFunction = (Fn) => function fn(...args) {
//     if(new.target) // OR: this instanceof fn
//         return new Fn(...args);
//     return Fn.apply(this, args);
// };

/**
 *
 * @param value 
 */
export const copyBase = (value: any): any => {
    // primitive value, function, etc...
    if(!isObject(value)) return value;

    // if(isTypedArray(value))
    //     return copyTypedArray(value);
    switch(typeOf(value)) {
    case "Object": // {}, new Object, new MyClass, etc...
        return value.constructor === Object ? {} : copyPrototype(value);
    case "Array": // [], new Array
        return []; // MEMO: 長さを継承しない場面(filter等の実装)での使用、または最適化できなくなる可能性からリテラル[]を使用。
        // return new Array(value.length);
    // case "Number": // new Number
    // case "String": // new String
    // case "Boolean": // new Boolean
    // case "RegExp":
    // case "Date":
    // case "Error":
    //     return new value.constructor(value);
    // case "BigInt": // Object(BigInt())
    // case "Symbol": // Object(Symbol())
    //     return Object(value.valueOf());
    // case "Arguments": // function() { return arguments }
    //     return $Arguments(...value); // MEMO: length保存しないなら中身いらない?
    // case "ArrayBuffer":
    //     return copyArrayBuffer(value);
    // case "DataView":
    //     return copyDataView(value);
    // case "Map":
    //     // if("map" in copy && !copy.map) return obj;
    //     return new Map(value);
    // case "Set":
    //     return new Set(value);
    default:
        return value;
    }
};
