import { assert } from "./assert";

// NOTE: 型の制限ではなく保証として使うことを想定するため、`void`は含まない。
export type Primitive = string | number | bigint | boolean | symbol | null | undefined;

/**
 * Determine if the value type is string, number, bigint, boolean, symbol, null, undefined.
 */
export const isPrimitive = (value: unknown): value is Primitive =>
    value == null || (typeof value !== "object" && typeof value !== "function");

export type ToPrimitiveHint = "string" | "number" | "default";

export interface HasToPrimitive {
    [Symbol.toPrimitive](hint: ToPrimitiveHint): Primitive;
}

/**
 * Implementation of `ToPrimitive`.
 *
 * @param input -
 * @param preferredType -
 * @throws TypeError
 * @see https://www.ecma-international.org/ecma-262/8.0/index.html#sec-toprimitive
 */
export const toPrimitive = (input: unknown, preferredType?: ToPrimitiveHint): Primitive => {
    if(isPrimitive(input)) return input;
    assert.type<HasToPrimitive>(input);

    // dprint-ignore
    const hintFlag
        = preferredType === "string" ? 1
        : preferredType === "number" ? 0
        : /* preferredType  default */ 2;

    if(typeof input[Symbol.toPrimitive] === "function") {
        const result = input[Symbol.toPrimitive](
            hintFlag === 2 ? "default" : preferredType!,
        );
        if(isPrimitive(result)) return result;
    } else {
        // OrdinaryToPrimitive
        for(let i = 0; i < 2; i++) {
            // eslint-disable-next-line @typescript-eslint/unbound-method
            const fn = (hintFlag & 1) === i ? input.valueOf : input.toString;

            if(typeof fn === "function") {
                const result = fn.call(input);
                if(isPrimitive(result)) return result;
            }
        }
    }
    throw new TypeError("Cannot convert object to primitive value");
};
