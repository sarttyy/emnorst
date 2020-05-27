
/* eslint-disable */
/// eslint-disable

type primitive = "String" | "Number" | "Boolean" | "Null" | "Symbol";

type arr8 = "Int8Array" | "Uint8Array" | "Uint8ClampedArray";
type arr16 = "Int16Array" | "Uint16Array";
type arr32 = "Int32Array" | "Uint32Array" | "Float32Array";
type arr64 = "Float64Array";
type typedArray = arr8 | arr16 | arr32 | arr64;
type array = "Array" | "Arguments" | typedArray | "ArrayBuffer";

type MapSet = "Map" | "Set" | "WeakMap" | "WeakSet";
type $object =  "Object" | "RegExp" | "Date" | "Math" | "JSON" | "Error" | "Promise" | MapSet | "DataView";
type $function = "Function" | "GeneratorFunction" | "Generator";
type ObjectToStringTypes = "Undefined" | primitive | $object | array | $function;

export const typeOf = (any): ObjectToStringTypes => ObjectToStringTypes;
