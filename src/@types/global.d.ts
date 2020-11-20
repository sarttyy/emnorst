
declare function assertType<T>(v: unknown): asserts v is T;

// interface IAssertType {
//     <T>(v: unknown): asserts v is T;
//     (v: unknown, t: "string"): asserts v is string;
//     (v: unknown, t: "number"): asserts v is number;
//     (v: unknown, t: "boolean"): asserts v is boolean;
// }

// declare const assertType: IAssertType;

type Callable = (...args: any) => any;

type TypedArray
    = Int8Array
    | Uint8Array
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Uint8ClampedArray
    | Float32Array
    | Float64Array;

type Primitive = string | number | bigint | boolean | symbol | null | undefined;
