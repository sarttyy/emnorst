
// @ts-check

import { isObject } from "../../util/is/object/object.js";
import { isTypedArray } from "../../util/is/object/typed-array.js";
import { typeOf } from "../../util/typeof.js";
import { Arguments as $Arguments } from "../../util/function/simple/arguments.js";

const copyPrototype = (object) => {
    const prototype = Object.getPrototypeOf(object);
    return Object.create(prototype);
};
const copyArrayBuffer = (buffer) => (
    new buffer.constructor(buffer.byteLength)
);
const copyTypedArray = (typedArray) => {
    const buffer = copyArrayBuffer(typedArray.buffer);
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
};
const copyDataView = (dataView) => {
    const buffer = copyArrayBuffer(dataView.buffer);
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
};
const copyFunction = (Fn) => {
    const $function = function() {
        if(new.target) // this instanceof $function
            return new Fn(...arguments);
        return Fn.apply(this, arguments);
    };
    Object.defineProperty($function, "name", { value: Fn.name });
    return $function;
};

export const copyType = (obj) => {
    if(!isObject(obj))// primitive value, function, etc(not ECMAScript`s Object)...
        return obj;
    if(isTypedArray(obj))
        return copyTypedArray(obj);
    switch(typeOf(obj)) {
    case "Object": // {}, new Object, new MyClass, etc...
        return copyPrototype(obj);
    case "Array": // [], new Array
        return new Array(obj.length);
    case "Number": // new Number
    case "String": // new String
    case "Boolean": // new Boolean
    case "RegExp":
    case "Date":
    case "Error":
        return new obj.constructor(obj);
    case "BigInt": // Object(BigInt())
    case "Symbol": // Object(Symbol())
        return Object(obj.valueOf());
    case "Arguments": // function() { return arguments }
        return $Arguments(...obj); // length保存しないなら中身いらない?
    case "ArrayBuffer":
        return copyArrayBuffer(obj);
    case "DataView":
        return copyDataView(obj);
    case "Map":
        return new Map(obj);
    case "Set":
        return new Set(obj);
    default:
        return obj;
    }
};
