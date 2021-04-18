
import type { TypedArray } from "../standard/typed-array";

/**
 * is %TypedArray%
 *
 * https://tc39.es/ecma262/#sec-properties-of-the-typedarray-constructors
 */
const $TypedArray$ = Object.getPrototypeOf(Int8Array);

export const isTypedArray = (value: unknown): value is TypedArray => (
    value instanceof $TypedArray$
);
