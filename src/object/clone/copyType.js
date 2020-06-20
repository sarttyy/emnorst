
// @ts-check

import { isObject, isTypedArray } from "../../util/is/type.js";
import { typeOf } from "../../util/typeof.js";

const copyObject = (object) => {
    const prototype = Object.getPrototypeOf(object);
    return Object.create(prototype);
};
const copyArgs = function() {
    return arguments;
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

export const copyType = (obj) => {
    if(!isObject(obj)) {
        return obj;
    }
    if(isTypedArray(obj)) {
        return copyTypedArray(obj);
    }
    switch(typeOf(obj)) {
    case "Object": // {}, new Object, new MyClass etc...
        return copyObject(obj);
    case "Array": // [], new Array
        return new Array(obj.length);
    case "Number": // new Number
    case "String": // new String
    case "Boolean": // new Boolean
    case "RegExp": // /regexp/, new RegExp
    case "Date":
    case "Error":
        return new obj.constructor(obj);
    case "BigInt": // Object(BigInt())
        return Object(obj.valueOf());
    case "Arguments":
        return copyArgs(...obj);
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
