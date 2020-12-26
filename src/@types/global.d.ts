
declare namespace assert {
    export function type<T>(v: unknown): asserts v is T;
    export function interface<T extends new(...args: any) => unknown>(v: unknown, t: T): asserts v is InstanceType<T>;
}

type Flatten<T> = {
    [K in keyof T]: T[K];
};

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
